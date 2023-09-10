import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";

export default function CharacterSelection({ setVoiceId }) {
  const [voiceId, setLocalVoiceId] = useState("");

  const handleButtonClick = (event, id: string) => {
    event.preventDefault();
    setLocalVoiceId(id);
    setVoiceId(id);
    new Audio(`https://hnshlqzjuzbgckjromvg.supabase.co/storage/v1/object/public/audioFiles/${id}.mp3?t=2023-09-10T11%3A22%3A21.387Z`).play();
    console.log(id)
  };

  return (
    h("div", {
        class: tw`mb-8 space-x-4 text-center items-center justify-center`
    }, [
        h( "h1", { class: tw`p-2 text-md text-center` }, "Choose a character by their voice."),
        h("button", { onClick: (event) => handleButtonClick(event, "9dSY1SPd1tIQimc1vGkV"), class: tw`bg-gray-200 hover:bg-gray-500 rounded-full p-2 text-black text-sm mx-auto inline` }, "Bosco"),
        h("button", { onClick: (event) => handleButtonClick(event, "CRgVuL7NHLOGdC7AAxb2"), class: tw`bg-gray-200 hover:bg-gray-500 rounded-full p-2 text-black text-sm mx-auto inline` }, "Cynthia"),
        h("button", { onClick: (event) => handleButtonClick(event, "VTvSgMwVP8qbNLRgV9vE"), class: tw`bg-gray-200 hover:bg-gray-500 rounded-full p-2 text-black text-sm mx-auto inline` }, "Alice"),
        h("button", { onClick: (event) => handleButtonClick(event, "rU18Fk3uSDhmg5Xh41o4"), class: tw`bg-gray-200 hover:bg-gray-500 rounded-full p-2 text-black text-sm mx-auto inline` }, "Ryan")
    ])
  );
}