import { Handlers } from "$fresh/server.ts";
import { OpenAI } from "https://deno.land/x/openai@1.4.2/mod.ts";
import { supabase } from "../../lib/supabase.ts";

const openAI = new OpenAI(Deno.env.get("OPENAI_API_KEY")!);

interface Data {
  generatedText: string;
  userInput: string;
}

function getFirstFiveWords(text: string) {
  return text.split(' ').slice(0, 5).join(' ');
}

function generateRecord(userInput: string, text: string) {
  return {
    text: text,
    title: userInput,
    created_at: new Date().toISOString(),
  };
}

export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    const formData = new URLSearchParams(await req.text());
    const userInput = formData.get("userInput") || "";

    const requestPayload = {
      model: "gpt-3.5-turbo",
      messages: [
        {
          "role": "system",
          "content":
            "Only reply in Markdown. You are a highly informed person, but you keep it short. You are pragmatic and logical. Dont use any numbered lists or other written structures in your texts. Speak in a captivating way. Avoid any descriptors such as [cough]",
        },
        { "role": "user", "content": userInput },
      ],
    };

    let combinedText = "";

    const body = new ReadableStream({
      async start(controller) {
        await openAI.createChatCompletionStream(
          requestPayload,
          (chunk: any) => {
            const message = chunk.choices[0]?.delta?.content || "";
            combinedText += message;

            // Stream each chunk wrapped in a JSON structure
            const chunkData = { type: "content", data: message };
            controller.enqueue(
              new TextEncoder().encode(JSON.stringify(chunkData) + "\n"),
            ); // newline for easier parsing
          },
        );

        // Insert into Supabase after all chunks are processed
        const { data, error } = await supabase
          .from("text_files")
          .insert([generateRecord(userInput, combinedText)])
          .select("id");

        if (error) {
          console.error("Error inserting data into Supabase:", error);
        }

        const text_id = data[0].id;

        // Stream the text_id as well
        const idData = { type: "meta", text_id: text_id };
        controller.enqueue(
          new TextEncoder().encode(JSON.stringify(idData) + "\n"),
        );

        controller.close();
      },
    });

    return new Response(body, {
      status: 200,
      headers: { "Content-Type": "application/x-ndjson" }, // using ndjson (newline delimited JSON)
    });
  },
};
