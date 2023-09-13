import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";

export default function SubjectCard({ message, voiceId, setAudioBlob }) {
  let data;
  try {
    // Parse function_call.arguments
    data = JSON.parse(message.choices[0].message.function_call.arguments);
  } catch (error) {
    console.error('Error parsing message:', error);
    data = {};
  }
  const { title, explanation, keycontents } = data;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  console.log("Title: " + title)
  console.log("Explanation: " + explanation)

  const handleListen = async () => {
    setIsLoading(true);
    setIsListening(true);
    const textToConvert = `${title}.     ${explanation}`;
    const response = await fetch(`/api/audio`, {
      method: 'POST',
      body: JSON.stringify({ script: textToConvert, voiceId: voiceId }),
      headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    const blob = await response.blob();
    console.log('Blob:', blob);
    setAudioBlob(blob);
    setIsLoading(false);
    setIsListening(false);
    return blob;
  }
};

  return h("div", { 
    class: tw`flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow-lg cursor-pointer m-4 mx-auto max-w-2xl `
  }, [
    h("h1", { class: tw`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-600 text-center` }, title),
    keycontents && isCollapsed && h("div", { class: tw`flex flex-wrap gap-2 mb-4 justify-center font-semibold flex-wrap` }, 
      Object.values(keycontents).map(keycontent => 
        h("span", { class: tw`bg-white text-gray-700 rounded-full text-sm` }, " • " + keycontent)
    )),
    !isCollapsed && h("p", { class: tw`text-sm mb-4 text-gray-700 text-center` }, explanation), // Conditional rendering here
    h("div", { class: tw`flex gap-2` }, [
      h("button", { 
          onClick: () => setIsCollapsed(!isCollapsed),
          class: tw`mt-auto text text-sm bg-white text-gray-700 border border-gray-800 p-2 rounded-full opacity-50 focus:outline-none`
        }, isCollapsed ? "Show Script" : "Show Keypoints"),
      !isListening && setAudioBlob && h("button", { 
        onClick: handleListen, 
        class: tw`bg-[#38A1FF] hover:bg-[#318BDC] mt-auto text-sm font-semibold text-white border p-2 rounded-full focus:outline-none`
      }, isLoading ? "Loading..." : "Listen" ),
      isListening && h("div", { class: tw`audio-spinner absolute bottom-10 left-1/2 transform p-4 text-center` }),
      isLoading && h("p", { class: tw`absolute bottom-5 left-1/2 -translate-x-1/2 text-center mt-auto text-sm font-semibold text-black p-2 focus:outline-none w-full`}, "This could take up to 1 minute"),
    ]),
  ]);
}
