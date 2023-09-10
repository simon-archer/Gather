import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";
import { tw } from "twind";

export default function AudioPlayer({ textToConvert, textId, setIsLoading }) {
  const audioRef = useRef(typeof Audio !== 'undefined' ? new Audio() : null);
  const [audioUrl, setAudioUrl] = useState(
    'https://hnshlqzjuzbgckjromvg.supabase.co/storage/v1/object/public/audioFiles/AliceExplained.mp3?t=2023-09-10T11%3A54%3A14.827Z'
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

 // Utility function to format time
const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

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

  const handleSkip = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // x position within the element
    const width = rect.width;
    const newTime = (x / width) * duration;
    audioRef.current.currentTime = newTime;
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', () => {
        setCurrentTime(Math.floor(audioRef.current.currentTime));
      });
      audioRef.current.addEventListener('loadedmetadata', () => {
        setDuration(Math.floor(audioRef.current.duration));
      });
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', () => {});
        audioRef.current.removeEventListener('loadedmetadata', () => {});
      }
    };
  }, []);

  useEffect(() => {
    if (audioUrl && audioRef.current) {
      audioRef.current.src = audioUrl;
    }
  }, [audioUrl]);

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

  const progress = (currentTime / duration) * 100;

  return h("div", { class: tw`fixed bottom-8 px-2 flex-col justify-center items-center mt-8 bg-gray-100 rounded-full shadow-md w-5/6` },
  [
    h("div", { class: tw`relative w-full max-w-screen flex flex-col justify-center items-center rounded-lg`,
               style: { maxWidth: '100vw' } },
      [
        h("button", { class: tw`absolute bottom-20 z-10 bg-[#38A1FF] hover:bg-[#318BDC] text-white rounded-full w-10 h-10 flex justify-center items-center`, 
              onClick: handlePlayPause }, 
            h("svg", { class: tw`fill-current text-white`, width: "24", height: "24" },
              h("path", { d: isPlaying ? "M6 19h4V5H6v14zm8-14v14h4V5h-4z" : "M8 5v14l11-7z" }) // Pause and Play icons
            )
          ),
        h("div", { class: tw`flex w-full justify-between items-center` }, 
          [
            h("span", { class: tw`m-2 py-2` }, formatTime(currentTime)),
            h("div", { class: tw`relative flex-grow h-2 bg-gray-300 rounded-full`,
                        onClick: handleSkip },
              [
                h("div", { class: tw`bg-[#38A1FF] rounded-full`, 
                            style: { width: `${progress}%`, height: '100%' } })
              ]
            ),
            h("span", { class: tw`m-2` }, formatTime(duration - currentTime))
          ]
        )
      ]
    )
  ]
);
}