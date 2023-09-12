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
        keyconcepts: keyconceptsJson,
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
          content: "I promise to guide you through your learning journey with careful consideration for where you're starting from. No fancy jargon or overwhelming details right off the bat. We'll focus on the essentials first, laying a solid foundation you can build on. Think of it like a puzzle; we'll start with the corner pieces and work our way in. And it won't be a dull list of facts; I'll provide context and show you how each piece fits into the larger picture using examples, analogies, metaphors and fun-facts where suitable. That way, you can easily add more complex ideas to your understanding as you go. We'll weave this all into a meaningful narrative that helps you not only learn but also appreciate the interconnectedness of the knowledge you're gaining. I will always reply in the language of the user input. I'll Deliver a two-paragraph, fun and entertaining answer. Emphasize core concepts, avoiding information overload, but I will offer examples, analogies or fun-facts where suited. My job is to ensure that my explanation offers a foundational schema that's expandable and context-rich. I'll speak naturally, without numbered lists or written-formal structures. I will not have sound descriptors like [cough]. And I will answer in the user's input language."
        },
        { 
          role: "user", 
          content: "Guide me through and give me an answer in two paragraphs that satisfies my curiosity, it could include examples, analogies, fun-facts or metaphors where suitable. Skip repeating instructions or giving topic introductions. Maintain the language of the user's input, but not if they just mention a language or country: " + userInput 
        }
      ],
      functions: [
        {
          name: 'generateFunEducationalContent',
          description: 'Guide the user through a learning journey with consideration for where they are starting from. No fancy jargon or overwhelming details right off the bat, lay a solid foundation you can build on. Provide context and show you how each piece fits into the larger picture using analogiex, examples, metaphors and fun-facts where suitable. Weave this all into a meaningful narrative that helps you the user learn but also appreciate the interconnectedness of the knowledge thei are gaining. Reply in the language of the user input.',
          parameters: {
            type: 'object',
            properties: {
              title: { 
                type: 'string', 
                description: 'Topic title.' 
              },
              explanation: { 
                type: 'string', 
                description: 'Explanation, in the user inputs language. but not if they just mention the language or country' 
              },
              keyconcepts: {
                type: 'object',
                description: 'Three highly-specific key points of the content, to explain to the user what the text is about before they read the text, each capitalized. Always in the user\'s language, but not if they just mention the language or country. Not more than 3-4 words. ',
                properties: {
                  keyconcept_1: { type: 'string' },
                  keyconcept_2: { type: 'string' },
                  keyconcept_3: { type: 'string' },
                },
                required: ['keyconcept_1', 'keyconcept_2', 'keyconcept_3']
              }
            },
            required: ['title', 'explanation', 'keyconcepts']
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
    const { title, explanation, keyconcepts } = parsedResponse;

    // Check if keyconcepts is a JSON object
    let keyconceptsJson;
    if (typeof keyconcepts === "object" && keyconcepts !== null) {
      keyconceptsJson = JSON.stringify(keyconcepts);
    } else {
      console.error("Keyconcepts is not a JSON object:", keyconcepts);
      return new Response(JSON.stringify({ error: "Invalid keyconcepts data" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Inside your POST handler
    try {
      await insertContent({
        title: title,
        keyconcepts: keyconceptsJson,
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