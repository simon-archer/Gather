const VOICE_API_KEY = Deno.env.get("VOICE_API_KEY") ?? "";

export const handler: Handlers = {
  async POST(req: Request, _ctx: HandlerContext) {
    try {
      const { script, voiceId } = await req.json();
      if (!script || !voiceId) {
        return new Response("Missing parameters", { status: 400 });
      }
      console.log("Voice ID" + voiceId);
      
      const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`, {
        method: 'POST',
        headers: {
          'accept': 'audio/mpeg',
          'xi-api-key': VOICE_API_KEY,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: script,
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.35,
            similarity_boost: 0.5
          }
        })
      });
      
      if (!response.ok) {
        throw new Error(`Fetch failed: ${response.statusText}`);
      }

      return new Response(response.body, { status: 200, headers: { 'Content-Type': 'audio/mpeg' } });
    } catch (err) {
      console.error(err);
      return new Response("Internal Server Error", { status: 500 });
    }
  }
};