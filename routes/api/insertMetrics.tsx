import { insertMetrics } from "../../utils/insertMetrics.ts";

export const handler = async (req: Request) => {
  const data = await req.json();

  try {
    await insertMetrics(data);
    return new Response(JSON.stringify({ message: "Metrics inserted successfully" }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};