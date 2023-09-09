import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";
import { supabase } from "../../lib/supabase.ts";

export default function TextField({ setFinalResponseText, isLoading, setIsLoading, handleGenerateContent }) {
  const [userInput, setUserInput] = useState("");
  const [error, setError] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    handleGenerateContent(userInput);
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
      // Insert new row into 'content' table
      await supabase
      .from('content')
      .insert([{
        title: responseData.title,
        keywords: JSON.stringify(responseData.keywords),
        user_input: userInput,
        full_gpt_response: JSON.stringify(responseData)
      }])
      .then(response => {
        console.log("Insertion Successful:", response);
      })
      .catch(error => {
        console.error("Supabase Insertion Error:", error);
      });
      setError(null);
    }
    setIsLoading(false);
  };

  return h(
    "div", { class: tw`flex flex-col sm:items-center items-start justify-center` }, [
      isLoading ? h("div", {}, "Loading...") : h("form", { onSubmit: handleFormSubmit, class: tw`w-full` }, [
        h( "h1", {
          class: tw`p-2 text-2xl`
        }, "What would you like to learn?"),
        h("textarea", {
          name: "userInput",
          placeholder: "Type in the subject...",
          value: userInput,
          onInput: e => setUserInput(e.target.value),
          rows: "4",
          class: tw`border-4 border-[#38A1FF] p-2 rounded-xl w-full mb-4 mx-auto shadow-lg focus:outline-none`,
        }),
        error && h("div", { 
          class: "rounded-full mt-2 text-sm shadow-sm p-2 m-4 text-red-500 bg-red-200" 
        }, error),     
        h("button", { 
          type: "submit", 
          class: tw`bg-[#38A1FF] hover:bg-[#318BDC] rounded-full px-4 py-2 text-white text-2xl mx-auto block` 
        }, "Generate")
      ])
    ]
  );
}