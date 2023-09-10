import { uuid } from "https://deno.land/x/uuid@v0.1.2/mod.ts";
import { supabase } from "../../lib/supabase.ts";

const ELEVENLABS_ENDPOINT = "https://api.elevenlabs.io/v2/text-to-speech/";
const VOICE_ID = Deno.env.get("VOICE_ID");
const VOICE_API_KEY = Deno.env.get("VOICE_API_KEY");

async function saveAudioToStorage(
  audioBuffer: ArrayBuffer,
  text_id: string,
): Promise<string> {
  const fileName = `${uuid()}.mp3`;
  console.log("Saving audio to", fileName);
  const { error: uploadError } = await supabase.storage
    .from("audio_files")
    .upload(`public/${fileName}`, new Uint8Array(audioBuffer), {
      contentType: "audio/mpeg",
    });

  if (uploadError) {
    console.error("Error uploading audio:", uploadError);
    throw uploadError;
  }

  const { data, error } = await supabase.storage
    .from("audio_files")
    .createSignedUrl(`public/${fileName}`, 10000000);

  if (error) {
    console.log("Error getting signed URL:", error);
    throw error;
  }

  const { error: updateError } = await supabase
    .from("text_files")
    .update({ audio_url: data.signedUrl })
    .eq("id", text_id);
  if (updateError) {
    console.error(
      "Error updating Supabase record with audio URL:",
      updateError,
    );
    throw updateError;
  }

  return data.signedUrl;
}

if (!VOICE_ID || !VOICE_API_KEY) {
  throw new Error(
    "Environment variables VOICE_ID and VOICE_API_KEY must be set.",
  );
}

export const handler = async (req: Request) => {
  const requestData = await req.json();
  const { script, text_id } = requestData;

  if (!script) {
    return new Response(JSON.stringify({ error: "Text is missing" }), {
      status: 400,
    });
  }
  if (!text_id) {
    return new Response(JSON.stringify({ error: "Text_ID is missing" }), {
      status: 400,
    });
  }

  const payload = {
    text: script,
    model_id: "eleven_monolingual_v1",
    voice_settings: {
      stability: 0.4,
      similarity_boost: 0.75,
      style: 0.5,
      use_speaker_boost: true,
    },
  };

  console.log ("Generating Audio")

  const requestOptions = {
    method: "POST",
    headers: {
      "accept": "audio/mpeg",
      "xi-api-key": `${VOICE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  try {
    const response = await fetch(
      `${ELEVENLABS_ENDPOINT}${VOICE_ID}/stream?optimize_streaming_latency=3`,
      requestOptions,
    );

    if (!response.ok) {
      throw new Error("Failed to fetch audio");
    }

    const audioBuffer = await response.arrayBuffer();
    const storedUrl = await saveAudioToStorage(audioBuffer, text_id);

    return new Response(JSON.stringify({ url: storedUrl }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(JSON.stringify({ error: "Failed to generate audio" }), {
      status: 500,
    });
  }
};
