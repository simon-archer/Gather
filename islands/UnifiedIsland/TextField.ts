import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { tw } from "twind";

export default function TextField({ setFinalResponseText, isLoading, setIsLoading }) {
  const [responseText, setResponseText] = useState("");
  const [userInput, setUserInput] = useState("");
  const [hasScrolled, setHasScrolled] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false); // New state to track button click
  const textRef = useRef(null);
  const containerWidth = 275;
  const [left, setLeft] = useState(containerWidth);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setButtonClicked(true);
    setIsLoading(true);
    const data = new URLSearchParams();
    data.append("userInput", userInput);
    try {
      await sendChatRequest(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendChatRequest = async (data) => {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: data,
    });
    await readResponse(response);
  };

  const readResponse = async (response) => {
    const reader = response.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const decodedChunk = new TextDecoder().decode(value);
      const lines = decodedChunk.split("\n").filter(Boolean);
      lines.forEach(line => {
        const message = JSON.parse(line);
        if (message.type === "content") {
          setResponseText(prevText => prevText + message.data.replace(/\n/g, '<br>'));
        } else if (message.type === "meta") {
          setFinalResponseText(responseText, message.text_id);
        }
      });
    }
  };

  const animate = () => {
    if (hasScrolled) {
      setButtonClicked(false); 
      return;
    }
    setLeft(prevLeft => {
      const textWidth = textRef.current ? textRef.current.offsetWidth : 16;
      if (prevLeft <= -textWidth + containerWidth) {
        setHasScrolled(true);
        return prevLeft;
      }
      return prevLeft - 3;
    });
    requestAnimationFrame(animate);
  };

  useEffect(() => {
    requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animate);
  }, []);

  const generateButton = !buttonClicked && hasScrolled
  ? h("button", {
      type: "submit",
      class: tw`block bg-green-500 text-white font-semibold pr-4 pl-4 p-2 rounded-full mt-4 mx-auto shadow-lg`,
    }, "Generate")
  : null;

  return h(
    "div", { class: tw`flex flex-col items-center justify-center` }, [
      h("div", { class: tw`flex flex-col mb-8 items-center` }, [
        h("h1", { class: tw`whitespace-nowrap text-3xl sm:text-4xl md:text-5xl font-bold mb-4` }, "Your Thoughts. Amplified."),
        h("h2", { class: tw`text-xl font-bold mb-4` }, ["Turn your thoughts or ideas into a", h("br"), "bite-sized audio clip you can listen to."]),
      ]),
      h("form", { onSubmit: handleFormSubmit, class: tw`w-full` }, [
        h("textarea", {
          name: "userInput",
          placeholder: "Type in your thought...",
          value: userInput,
          onInput: e => setUserInput(e.target.value),
          rows: "4",
          class: tw`border-4 border-green-500 p-2 rounded-xl w-full mb-4 mx-auto shadow-lg focus:outline-none`,
        }),
        h(
          "div", 
          { 
            class: tw`relative rounded-xl overflow-hidden bg-white w-96 h-10 border border-gray-300 shadow-m items-center justify-center gradient-overlay`  // Add the custom class here
          }, 
          [
            h("span", { ref: textRef, class: tw`p-2 absolute text-left whitespace-nowrap`, style: { left: `${left}px` } }, responseText)
          ]
        ),
        generateButton      
      ])
    ]
  );
}
