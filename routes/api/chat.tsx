import { Handlers } from "$fresh/server.ts";
import { OpenAI } from "https://deno.land/x/openai@1.4.2/mod.ts";
import { insertContent } from "../../utils/insertContent.ts";
import { supabase } from "../../lib/supabase.ts";

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
        keywords: keywordsJson,
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
          "role": "system",
          "content":
            "I'm a personalized tutor that makes learning easy and fun. I promise to guide you through your learning journey with careful consideration for where you're starting from. No fancy jargon or overwhelming details right off the bat. We'll focus on the essentials first, laying a solid foundation you can build on. Think of it like a puzzle; we'll start with the corner pieces and work our way in. And it won't be a dull list of facts; I'll provide context and show you how each piece fits into the larger picture. That way, you can easily add more complex ideas to your understanding as you go. We'll weave this all into a meaningful narrative that helps you not only learn but also appreciate the interconnectedness of the knowledge you're gaining. I will always reply in the language of the user input.",
        },
        { "role": "user", "content": "Do not repeat instructions in the response or provide a introduction for each topic. Always reply in the language of the user input: " + userInput },
      ],
      functions: [
        {
          name: 'generateEducationalContent',
          description: 'Answer in one paragraph. Remember these things when answering: Prior Knowledge Gap: Understand that the learner is starting from scratch, and therefore won`t have the vocabulary or conceptual background to understand specialized jargon or complex ideas immediately. Cognitive Load: Try not to overwhelm the learner with too much information at once. Focus on essential elements that will provide a solid foundation. Building Blocks: Recognize that a schema should provide the building blocks of a subject in a way that allows for later complexity. It should be both extensible and flexible. Contextualization: Schemas are more effective if they`re contextualized. A good schema is not just a set of isolated facts but also includes an understanding of how and why these facts are relevant or interconnected. Reply in a spoken manner and dont use any numbered lists or other written structures in your texts. Avoid any descriptors such as [cough]. Always reply in the language of the user input.',
          parameters: {
            type: 'object',
            properties: {
              title: { 
                type: 'string',
                description: 'This is the title of the topic.' 
              },
              explanation: { 
                type: 'string',
                description: 'This explanation of the topic should always be in the same language of the user input.' 
              },
              keywords: {
                type: 'object',
                description: 'These 3 keywords should be very niche to the topic. Each keyword should be capitalized. Always in the language of the user input.' ,
                properties: {
                  keyword_1: { type: 'string' },
                  keyword_2: { type: 'string' },
                  keyword_3: { type: 'string' },
                },
                required: ['keyword_1', 'keyword_2', 'keyword_3']
              }
            },
            required: ['title', 'explanation', 'keywords']
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
    const { title, explanation, keywords } = parsedResponse;

    // Check if keywords is a JSON object
    let keywordsJson;
    if (typeof keywords === "object" && keywords !== null) {
      keywordsJson = JSON.stringify(keywords);
    } else {
      console.error("Keywords is not a JSON object:", keywords);
      return new Response(JSON.stringify({ error: "Invalid keywords data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Inside your POST handler
    try {
      await insertContent({
        title: title,
        keywords: keywordsJson,
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