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
  const { title, explanation, keywords } = data;
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  console.log("Title: " + title)
  console.log("Explanation: " + explanation)

  const handleListen = async () => {
    setIsLoading(true);
    const textToConvert = `${title}. ${explanation}`;
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
    return blob;
  }
};

  return h("div", { 
    class: tw`flex flex-col mb-8 items-center justify-center bg-white p-6 rounded-lg shadow-lg cursor-pointer p-4 m-4 mx-auto max-w-3xl`
  }, [
    h("h1", { class: tw`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-600 text-center` }, title),
    keywords && h("div", { class: tw`flex flex-wrap gap-2 mb-4 justify-center` }, 
      Object.values(keywords).map(keyword => 
        h("span", { class: tw`border-blue-200 bg-white text-blue-700 rounded-full px-2 py-1 text-sm font-semibold` }, keyword)
    )),
    !isCollapsed && h("p", { class: tw`text-md mb-4 text-gray-700 text-center` }, explanation),
    h("div", { class: tw`flex gap-2` }, [
      h("button", { 
          onClick: () => setIsCollapsed(!isCollapsed),
          class: tw`mt-auto text-sm bg-gray-200 text-gray-500 border border-gray-700 p-2 rounded-full opacity-50 focus:outline-none`
        }, isCollapsed ? "Show Text" : "Hide Text"),
      h("button", { 
        onClick: handleListen, 
        class: tw`bg-[#38A1FF] hover:bg-[#318BDC] mt-auto text-sm font-semibold text-white border p-2 rounded-full focus:outline-none`
      }, isLoading ? "Loading..." : "Listen" ),
    ]),
  ]);
}
