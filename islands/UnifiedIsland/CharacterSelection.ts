import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";

export default function CharacterSelection({ setVoiceId }) {
  const [voiceId, setLocalVoiceId] = useState("");

  const handleButtonClick = (event, id: string) => {
    event.preventDefault();
    setLocalVoiceId(id);
    setVoiceId(id);
    new Audio(`../../audio/${id}.mp3`).play();
  };

  return (
    h("div", {
        class: tw`py-4 space-x-4 flex justify-center`
    }, [
      h("button", { onClick: (event) => handleButtonClick(event, "CRgVuL7NHLOGdC7AAxb2"), class: tw`bg-gray-200 hover:bg-gray-500 rounded-full p-2 text-black text-sm mx-auto inline` }, "Cynthia 🔊"),
      h("button", { onClick: (event) => handleButtonClick(event, "9dSY1SPd1tIQimc1vGkV"), class: tw`bg-gray-200 hover:bg-gray-500 rounded-full p-2 text-black text-sm mx-auto inline` }, "Bosco 🔊"),
      h("button", { onClick: (event) => handleButtonClick(event, "VTvSgMwVP8qbNLRgV9vE"), class: tw`bg-gray-200 hover:bg-gray-500 rounded-full p-2 text-black text-sm mx-auto inline` }, "Alice 🔊"),
      h("button", { onClick: (event) => handleButtonClick(event, "rU18Fk3uSDhmg5Xh41o4"), class: tw`bg-gray-200 hover:bg-gray-500 rounded-full p-2 text-black text-sm mx-auto inline` }, "Ryan 🔊")
    ])
  );
}