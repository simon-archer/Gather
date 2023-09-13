import { Handlers } from "$fresh/server.ts";
import { OpenAI } from "https://deno.land/x/openai@1.4.2/mod.ts";
import { insertContent } from "../../utils/insertContent.ts";

const openAI = new OpenAI(Deno.env.get("OPENAI_API_KEY")!);

interface Data {
  gptResponse: string;
  userInput: string;
}

export const handler: Handlers<Data> = {
  async POST(req, ctx) {
    const formData = new URLSearchParams(await req.text());
    const userInput = formData.get("userInput") || "";

    // Inside your POST handler
    try {
      await insertContent({
        title: title,
        keycontents: keycontentsJson,
        user_input: userInput,
        full_gpt_response: JSON.stringify(response)
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }

    const requestPayload = ({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "I promise to guide you through your exploration of your input with careful consideration for where you're starting from. I'll provide context and show you how each piece fits into the larger picture using examples, analogies, metaphors and fun-facts where suitable. That way, you can easily add more complex ideas to your understanding as you go. We'll weave this all into a meaningful narrative that helps you not only learn but also appreciate the interconnectedness of the knowledge you're gaining. I will always reply in the language of the user input. I'll Deliver a two-paragraph, fun and entertaining answer. Emphasize core contents, avoiding information overload, but I will offer examples, analogies or fun-facts where suited. My job is to ensure that my explanation offers a foundational schema that's expandable and context-rich. I'll speak naturally, without numbered lists or written-formal structures. I will not have sound descriptors like [cough]. And I will answer in the user's input language."
        },
        { 
          role: "user", 
          content: "My topic: [" + userInput  + "]. Give me a 2 paragraphs answer about the given topic in two paragraphs that satisfies my curiosity, it could include examples, analogies, fun-facts or metaphors where suitable. Skip repeating my instructions or introductions. Answer in the language of the my input, but not if I just mention a language or country. Always in the written language of my topic: [ " +  userInput + " ]"
        }
      ],
      functions: [
        {
          name: 'giveInterestingAnswerWithContext',
          description: 'Give a satisfying answer to the users topic it should be about 2 pragraphs. Always in the language Of the My topic: [ topic ]',
          parameters: {
            type: 'object',
            properties: {
              title: { 
                type: 'string', 
                description: 'Short but memorable project title. not the same as the user topic. Always in the language Of the My topic: [ topic ]' 
              },
              explanation: { 
                type: 'string', 
                description: 'Give the user a highly interesting and 2 paragraphs answer, by providing context using analogiex, examples, metaphors and fun-facts where suitable. Build a meaningful narrative that helps you the user learn but also appreciate the interconnectedness of the knowledge they are gaining. Always in the language Of the My topic: [ topic ].' 
              },
              keycontents: {
                type: 'object',
                description: '3 key points of the content. Always in the language Of the My topic: [ topic ]. Only 2-3 words for each key point. ',
                properties: {
                  keycontent_1: { type: 'string' },
                  keycontent_2: { type: 'string' },
                  keycontent_3: { type: 'string' },
                },
                required: ['keycontent_1', 'keycontent_2', 'keycontent_3']
              }
            },
            required: ['title', 'explanation', 'keycontents']
          }
        }
      ],
      function_call: 'auto',
    });


    const response = await openAI.createChatCompletion(requestPayload);
    console.log("GPT-3 response:", response);

    const functionCall = response.choices[0]?.message?.function_call;
    if (!functionCall) {
      return new Response(JSON.stringify({ error: "No function call in response" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const gptResponse = functionCall.arguments || "";

    // Check if gptResponse is a stringified JSON object
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(gptResponse);
      console.log("Parsed Response:", parsedResponse);
    } catch (e) {
      console.error("Failed to parse GPT-3 response:", e);
      return new Response(JSON.stringify({ error: "Invalid GPT-3 response" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Extract fields from parsed GPT-3 response
    const { title, explanation, keycontents } = parsedResponse;

    // Check if keycontents is a JSON object
    let keycontentsJson;
    if (typeof keycontents === "object" && keycontents !== null) {
      keycontentsJson = JSON.stringify(keycontents);
    } else {
      console.error("Keycontents is not a JSON object:", keycontents);
      return new Response(JSON.stringify({ error: "Invalid keycontents data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Inside your POST handler
    try {
      await insertContent({
        title: title,
        keycontents: keycontentsJson,
        user_input: userInput,
        full_gpt_response: JSON.stringify(response)
      });
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }

    return new Response(JSON.stringify({ message: gptResponse }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
};