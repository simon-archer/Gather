import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY");
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function fetchStoredUrl(text_id: string): Promise<string> {
  const { data, error } = await supabase
    .from("text_files")
    .select("audio_url")
    .eq("id", text_id)
    .single();

  if (error) {
    console.error("Error fetching stored URL:", error);
    throw error;
  } else if (!data?.audio_url) {
    console.error("No URL found for given ID:", text_id);
    throw new Error("No URL found for given ID");
  } else {
    console.log("URL retrieved successfully:", data.audio_url);
    return data.audio_url;
  }
}

export const handler = async (req: Request) => {
  const requestData = await req.json();
  const { text_id } = requestData;

  if (!text_id) {
    return new Response(JSON.stringify({ error: "Text_ID is missing" }), {
      status: 400,
    });
  }

  try {
    const storedUrl = await fetchStoredUrl(text_id);
    return new Response(JSON.stringify({ url: storedUrl }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
