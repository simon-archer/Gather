import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { tw } from "twind";

export default function TextField({ setFinalResponseText, isLoading, setIsLoading }) {
  const [userInput, setUserInput] = useState("");

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
    setFinalResponseText(responseData.message);
    setIsLoading(false);
  };

  return h(
    "div", { class: tw`flex flex-col items-center justify-center` }, [
      isLoading ? h("div", {}, "Loading...") : h("form", { onSubmit: handleFormSubmit, class: tw`w-full` }, [
        h("textarea", {
          name: "userInput",
          placeholder: "Type in your thought...",
          value: userInput,
          onInput: e => setUserInput(e.target.value),
          rows: "4",
          class: tw`border-4 border-green-500 p-2 rounded-xl w-full mb-4 mx-auto shadow-lg focus:outline-none`,
        }),
        h("button", { 
          type: "submit", 
          class: tw`bg-green-500 hover:bg-green-600 rounded-full px-4 py-2 text-white mx-auto block` 
        }, "Generate")
      ])
    ]
  );
}