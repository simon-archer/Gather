// api/fetchHistory.tsx
import { supabase } from "../../lib/supabase.ts";

export const handler = async (req: Request) => {
  const url = new URL(req.url);
  const page = Number(url.searchParams.get('page')) || 1;
  const limit = 10;
  const start = (page - 1) * limit;
  const end = start + limit - 1;

  try {
    const { data, error } = await supabase
      .from('content')
      .select('*, full_gpt_response')
      .order('created_at', { ascending: false })
      .range(start, end);

    if (error) {
      console.error('Error fetching history:', error);
      return new Response(JSON.stringify({ error: 'Failed to fetch history' }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }

    return new Response(JSON.stringify({ data }), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    });

  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch history" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
