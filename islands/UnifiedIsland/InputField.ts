import { h, Fragment } from "preact";
import { useState} from "preact/hooks";
import { tw } from "twind";

export default function InputField({ setFinalResponseText, isLoading, setIsLoading, voiceId, setVoiceId }) {
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
      setError("Was not able to detect curiosity.");
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
    console.log("Button Highlighted " + id);
    new Audio(`https://hnshlqzjuzbgckjromvg.supabase.co/storage/v1/object/public/audioFiles/${id}.mp3?t=2023-09-10T11%3A22%3A21.387Z`).play();
  };

  return h(
    "div", { class: tw`flex flex-col items-center justify-center h-screen` }, [
      isLoading ? 
      h(Fragment, {}, [
        h("div", { class: tw`text-sm loading-text bg-white border-2 border-black shadow-lg rounded-full py-2 px-4 m-8 font-semibold text-center` }),
        h("div", { class: tw`spinner` }),
      ]) 
    : h("form", { onSubmit: handleFormSubmit, class: tw`flex flex-col items-center w-full` }, [
        h( "h1", {
          class: tw`py-4 text-xl font-semibold text-center`
        }, "What are you wondering about?"),
        error && h("div", { 
          class: "rounded-full text-sm shadow-sm p-2 text-red-500 bg-red-200 mx-auto text-center" 
        }, error),
        h("textarea", {
          name: "userInput",
          placeholder: "ex. Russian mushroom traditions...",
          value: userInput,
          onInput: e => setUserInput(e.target.value),
          rows: "4",
          class: tw`border-4  border-[#38A1FF] p-2 rounded-xl w-3/4 h-1/4 mx-auto shadow-lg focus:outline-none`,
        }),
        h( "p", {
          class: tw`py-4 text-sm text-grey-400 text-center w-3/4`
        }, "The more specific your question is, the more specific the answer will be."),
        h( "h1", {
          class: tw`pt-8 text-xl font-semibold text-center`
        }, "Who do you want to listen to?"),
        h("div", { class: tw` py-4 flex flex-wrap justify-center items-center` }, [
        h("button", { onClick: (event) => handleButtonClick(event, "9dSY1SPd1tIQimc1vGkV"), class: voiceId === "9dSY1SPd1tIQimc1vGkV" ? tw`bg-blue-400 hover:bg-blue-500 rounded-full p-2 text-black text-sm mx-2 my-1 focus:outline-none` : tw`bg-gray-200 hover:bg-gray-400 rounded-full p-2 text-black text-sm mx-2 my-1 focus:outline-none`}, "Bosco"),
        h("button", { onClick: (event) => handleButtonClick(event, "CRgVuL7NHLOGdC7AAxb2"), class: voiceId === "CRgVuL7NHLOGdC7AAxb2" ? tw`bg-blue-400 hover:bg-blue-500 rounded-full p-2 text-black text-sm mx-2 my-1 focus:outline-none` : tw`bg-gray-200 hover:bg-gray-400 rounded-full p-2 text-black text-sm mx-2 my-1 focus:outline-none`}, "Cynthia"),
        h("button", { onClick: (event) => handleButtonClick(event, "VTvSgMwVP8qbNLRgV9vE"), class: voiceId === "VTvSgMwVP8qbNLRgV9vE" ? tw`bg-blue-400 hover:bg-blue-500 rounded-full p-2 text-black text-sm mx-2 my-1 focus:outline-none` : tw`bg-gray-200 hover:bg-gray-400 rounded-full p-2 text-black text-sm mx-2 my-1 focus:outline-none`}, "Alice"),
        h("button", { onClick: (event) => handleButtonClick(event, "rU18Fk3uSDhmg5Xh41o4"), class: voiceId === "rU18Fk3uSDhmg5Xh41o4" ? tw`bg-blue-400 hover:bg-blue-500 rounded-full p-2 text-black text-sm mx-2 my-1 focus:outline-none` : tw`bg-gray-200 hover:bg-gray-400 rounded-full p-2 text-black text-sm mx-2 my-1 focus:outline-none`}, "Ryan")
      ]),     
        h("button", { 
          type: "submit", 
          class: tw`bg-[#38A1FF] hover:bg-[#318BDC] m-8 rounded-full px-4 py-2 text-white text-xl mx-auto block` 
        }, "Generate")
      ])
    ]
  );
}