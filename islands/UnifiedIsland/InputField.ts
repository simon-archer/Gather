import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";
import CharacterSelection from "./CharacterSelection.ts";

export default function TextField({ setFinalResponseText, isLoading, setIsLoading, handleGenerateContent }) {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);
  const [voiceId, setVoiceId] = useState(""); 

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  setIsLoading(true);
  handleGenerateContent(userInput, voiceId);
    const data = new URLSearchParams();
    data.append("userInput", userInput);
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: data,
    });

    const responseData = await response.json();
    if (responseData.error) {
      setError("Was not able to detect learning intention.");
      setTimeout(() => setError(null), 5000);
    } else {
      setFinalResponseText(responseData.message);
      setError(null);
    }
    setIsLoading(false);
  };

  return h(
    "div", { class: tw`flex flex-col items-center justify-center h-screen pb-32` }, [
      isLoading ? h("div", {}, "Loading...") : h("form", { onSubmit: handleFormSubmit, class: tw`flex flex-col items-center w-full` }, [
        h( "h1", {
          class: tw`p-2 text-xl text-center`
        }, "What would you like to learn?"),
        h("textarea", {
          name: "userInput",
          placeholder: "Type in the subject...",
          value: userInput,
          onInput: e => setUserInput(e.target.value),
          rows: "4",
          class: tw`border-4 border-[#38A1FF] p-2 rounded-xl w-full h-1/4 mx-auto shadow-lg focus:outline-none`,
        }),
        h(CharacterSelection, { setVoiceId }),
        error && h("div", { 
          class: "rounded-full text-sm shadow-sm text-red-500 bg-red-200 mx-auto text-center" 
        }, error),     
        h("button", { 
          type: "submit", 
          class: tw`bg-[#38A1FF] hover:bg-[#318BDC] rounded-full px-4 py-2 text-white text-xl mx-auto block` 
        }, "Generate")
      ])
    ]
  );
}