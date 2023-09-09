import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { tw } from "twind";

export default function AudioPlayer({ textToConvert, textId, setIsLoading }) {
  const audioRef = useRef(null);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (!textToConvert || !textId) return;

    async function fetchAndSetAudioUrl() {
      setIsLoading(true);
      console.log("Generating Audio");
      try {
        const body = JSON.stringify({ script: textToConvert, text_id: textId });
        const response = await fetch("/api/audio", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        });

        if (response.ok) {
          const data = await response.json();
          setAudioUrl(data.url);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Failed to fetch audio URL:", error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    }

    fetchAndSetAudioUrl();
  }, [textToConvert, textId]);

  return audioUrl && h("div", {
    class: tw`flex flex-col justify-center items-center mt-8 bg-gray-100 rounded-lg shadow-md }`
    }, [
      h("audio", {
        ref: audioRef,
        src: audioUrl || "",  // If audioUrl is null or undefined, use an empty string
        controls: true,
        disabled: !audioUrl,  // Disable the audio player if audioUrl is not available
      }),
  ]);
}
