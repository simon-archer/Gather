import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { tw } from "twind";
import InputField from "./InputField.ts";
import AudioPlayer from "./AudioPlayer.ts"
import History from "./History.ts";
import SubjectCard from "./SubjectCard.ts";


export default function UnifiedIsland() {
  const [finalResponseText, setFinalResponseText] = useState("");
  const [textId, setTextId] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSubjectCard, setShowSubjectCard] = useState(true);
  const [shouldRefreshHistory, setShouldRefreshHistory] = useState(false);

  // Modify the setFinalResponseText function to also set the textId
  const handleTextGenerated = (text, id) => {
    setFinalResponseText({ choices: [{ message: { function_call: { arguments: text } } }] });
    setTextId(id);
  };

  const handleGenerateContent = async (userInput) => {
    const response = await fetch('/api/chat', {
      method: 'POST',
      body: new URLSearchParams({ userInput }),
    });
  
    if (response.ok) {
      setShouldRefreshHistory(true);
    }
  };

  useEffect(() => {
    console.log(selectedItem);
  }, [selectedItem]);

  return h("div", { class: tw`flex flex-row min-h-screen` }, [
    // h("div", {
    //   class: tw`relative ${isCollapsed ? 'sm:w-0 w-0 md:w-1/2 lg:w-1/3' : 'w-full'} flex flex-col items-start h-screen overflow-auto border-r border-gray-200`
    // }, [
    //   h(History, { 
    //     isCollapsed: isCollapsed, 
    //     setIsCollapsed: setIsCollapsed, 
    //     setSelectedItem: setSelectedItem,
    //     shouldRefreshHistory: shouldRefreshHistory,
    //     setShouldRefreshHistory: setShouldRefreshHistory 
    //   })
    // ]),
    // h("div", { class: tw`absolute top-1 left-1 m-2 z-20` }, [
    //   h("button", {
    //     onClick: () => setIsCollapsed(!isCollapsed),
    //     class: tw`bg-white text-black p-2 rounded-md inline-block outline-none focus:outline-none`
    //   }, 
    //   h('img', { 
    //       src: 'https://cdn.icon-icons.com/icons2/2090/PNG/512/hide_sidebar_horizontal_icon_128227.png',
    //       class: tw`${isCollapsed ? ' shadow-lg transform rotate-180 max-w-[32px] max-h-[32px]' : 'max-w-[32px] max-h-[32px]'}`
    //   }))
    // ]),
    isCollapsed && h("button", { 
      onClick: () => { setFinalResponseText(""); setSelectedItem(null); setShowSubjectCard(true); },
      class: tw`fixed z-10 top-5 right-0 transform -translate-x-1/2 text-3xl mb-4 bg-[#38A1FF] hover:bg-[#318BDC] text-white font-semibold pt-2 pb-2 pl-4 pr-4 rounded-full shadow-lg`,
    }, "+"),
    isCollapsed && h("div", {
      class: tw`flex flex-col items-center justify-center z-0 w-full p-4`
    }, [
      !selectedItem && (!finalResponseText || finalResponseText === "") && h(InputField, { setFinalResponseText: handleTextGenerated, isLoading, setIsLoading, handleGenerateContent }),
      showSubjectCard && finalResponseText && h(SubjectCard, { message: selectedItem ? selectedItem : finalResponseText, class: tw`w-auto max-w-xl`}),
      selectedItem && h('div', {}, ''),
      !selectedItem && h(AudioPlayer, { textToConvert: finalResponseText, textId: textId, setIsLoading, class: tw`w-full` }),
      selectedItem && h(SubjectCard, { message: selectedItem, class: tw`w-auto max-w-xl`}),
    ]),
  ])
};