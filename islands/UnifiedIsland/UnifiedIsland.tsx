import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";
import TextField from "./TextField.ts";
import AudioPlayer from "./AudioPlayer.ts"
import History from "./History.ts";
import SelectedItem from "./SelectedItem.ts";
import SubjectCard from "./SubjectCard.ts";


export default function UnifiedIsland() {
  const [finalResponseText, setFinalResponseText] = useState("");
  const [textId, setTextId] = useState(null); 
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  

  // Modify the setFinalResponseText function to also set the textId
  const handleTextGenerated = (text, id) => {
    setFinalResponseText(text);
    setTextId(id);
  };

  return h("div", { class: tw`flex flex-row min-h-screen` }, [
    h("div", {
      class: tw`relative transition-all duration-300 ${isCollapsed ? 'sm:w-0 w-full' : 'sm:w-1/4 w-full'} flex flex-col items-start h-screen overflow-auto border-r border-gray-200`
    }, [
      h(History, { isCollapsed: isCollapsed, setIsCollapsed: setIsCollapsed, setSelectedItem: setSelectedItem })
    ]),
    h("div", { class: tw`relative top-0 left-0 m-2 utline-none` }, [
        h("button", {
          onClick: () => setIsCollapsed(!isCollapsed),
          class: tw`bg-white text-black p-2 rounded-md inline-block outline-none focus:outline-none`
        }, 
        h('img', { 
            src: 'https://cdn.icon-icons.com/icons2/2090/PNG/512/hide_sidebar_horizontal_icon_128227.png',
            class: tw`${isCollapsed ? 'transform rotate-180 max-w-[32px] max-h-[32px]' : 'max-w-[32px] max-h-[32px]'}`
        })
        ),
      ]),
      h("div", {
        class: tw`transition-all duration-300 ease-in-out ${isCollapsed ? 'w-11/12' : 'w-2/3'} flex flex-col items-center justify-center`
      }, [
        !selectedItem && h(selectedItem ? SelectedItem : TextField, { setFinalResponseText: handleTextGenerated, isLoading, setIsLoading, ...(selectedItem && { item: selectedItem }) }),
        finalResponseText && h(SubjectCard, { message: finalResponseText }),
        selectedItem && h( "button", {
          onClick: () => setSelectedItem(null),
          class: tw`block bg-green-500 text-white font-semibold pr-4 pl-4 p-2 rounded-full mt-4 mx-auto shadow-lg`,
        }, "Generate New"),
        !selectedItem && h(AudioPlayer, { textToConvert: finalResponseText, textId: textId, setIsLoading }),
      ])
    ])
};