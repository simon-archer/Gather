import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { tw } from "twind";

export default function AudioPlayer({ textToConvert, textId, setIsLoading }) {
  const audioRef = useRef(typeof Audio !== 'undefined' ? new Audio() : null);
  const [audioUrl, setAudioUrl] = useState(
    'https://hnshlqzjuzbgckjromvg.supabase.co/storage/v1/object/public/audioFiles/rU18Fk3uSDhmg5Xh41o4.mp3?t=2023-09-10T11:23:13.969Z'
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0); // Initialize the timer state

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

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
    }
  }, [audioUrl]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(audioRef.current.currentTime);
      });
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', () => {});
      }
    };
  }, []);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
    setIsPlaying(!isPlaying);
  };

  return h("div", { class: tw`flex flex-col justify-center items-center mt-8 bg-gray-100 rounded-lg shadow-md` },
    [
      h("button", { onClick: handlePlayPause }, isPlaying ? "Pause" : "Play"),
      h("span", {}, `Current Time: ${currentTime.toFixed(2)}s`) // Display the timer
    ]
  );
}