import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";

export default function InputField({ setFinalResponseText, isLoading, setIsLoading, setVoiceId }) {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  setIsLoading(true);
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

  const handleButtonClick = (event, id: string) => { // Add this function
    event.preventDefault();
    setVoiceId(id);
    console.log("Input Field: Set Voice ID: " + id);
    new Audio(`https://hnshlqzjuzbgckjromvg.supabase.co/storage/v1/object/public/audioFiles/${id}.mp3?t=2023-09-10T11%3A22%3A21.387Z`).play();
  };

  return h(
    "div", { class: tw`flex flex-col items-center justify-center h-screen` }, [
      isLoading ? h("div", {}, "Loading...") : h("form", { onSubmit: handleFormSubmit, class: tw`flex flex-col items-center w-full` }, [
        h( "h1", {
          class: tw`py-4 text-xl font-semibold text-center`
        }, "What would you like to learn?"),
        h("textarea", {
          name: "userInput",
          placeholder: "Type in the subject...",
          value: userInput,
          onInput: e => setUserInput(e.target.value),
          rows: "4",
          class: tw`border-4  border-[#38A1FF] p-2 rounded-xl w-full h-1/4 mx-auto shadow-lg focus:outline-none`,
        }),
        h( "h1", {
          class: tw`pt-8 text-xl font-semibold text-center`
        }, "Who do you want to listen to?"),
        h("div", { class: tw` py-4 flex flex-wrap justify-center items-center` }, [
        h("button", { onClick: (event) => handleButtonClick(event, "9dSY1SPd1tIQimc1vGkV"), class: tw`bg-gray-200 hover:bg-gray-400 rounded-full p-2 text-black text-sm mx-2 my-1` }, "Bosco"),
        h("button", { onClick: (event) => handleButtonClick(event, "CRgVuL7NHLOGdC7AAxb2"), class: tw`bg-gray-200 hover:bg-gray-400 rounded-full p-2 text-black text-sm mx-2 my-1` }, "Cynthia"),
        h("button", { onClick: (event) => handleButtonClick(event, "VTvSgMwVP8qbNLRgV9vE"), class: tw`bg-gray-200 hover:bg-gray-400 rounded-full p-2 text-black text-sm mx-2 my-1` }, "Alice"),
        h("button", { onClick: (event) => handleButtonClick(event, "rU18Fk3uSDhmg5Xh41o4"), class: tw`bg-gray-200 hover:bg-gray-400 rounded-full p-2 text-black text-sm mx-2 my-1` }, "Ryan")
      ]),
        error && h("div", { 
          class: "rounded-full text-sm shadow-sm text-red-500 bg-red-200 mx-auto text-center" 
        }, error),     
        h("button", { 
          type: "submit", 
          class: tw`bg-[#38A1FF] hover:bg-[#318BDC] m-8 rounded-full px-4 py-2 text-white text-xl mx-auto block` 
        }, "Generate")
      ])
    ]
  );
}