import { h, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { tw } from "twind";
import InputField from "./InputField.ts";
import AudioPlayer from "./AudioPlayer.ts";
import SubjectCard from "./SubjectCard.ts";

export default function UnifiedIsland() {
  const audioRef = useRef(typeof Audio !== 'undefined' ? new Audio() : null);
  const [finalResponseText, setFinalResponseText] = useState("");
  const [textId, setTextId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showSubjectCard, setShowSubjectCard] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [voiceId, setVoiceId] = useState("");
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

  const handleTextGenerated = (text, id) => {
    setFinalResponseText({ choices: [{ message: { function_call: { arguments: text } } }] });
    setTextId(id);
  };

  return h("div", { class: tw`flex flex-row items-center justify-center min-h-screen` }, [
    isCollapsed && h(Fragment, {}, [
      h("button", {
        onClick: () => { setFinalResponseText(""); setSelectedItem(null); setShowSubjectCard(true); setAudioBlob(null); },
        class: tw`fixed z-10 top-5 right-0 transform -translate-x-1/2 w-12 h-12 bg-[#38A1FF] hover:bg-[#318BDC] text-white font-semibold flex justify-center items-center rounded-full shadow-lg`,
      }, [
        h("svg", { class: tw`fill-current text-white`, width: "24", height: "24" },
          h("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })
        )
      ]),
      h("div", {
        class: tw`flex flex-col items-center justify-center z-0 w-full p-4`
      }, [
        !selectedItem && (!finalResponseText || finalResponseText === "") && h(InputField, { setFinalResponseText: handleTextGenerated, isLoading, setIsLoading, setVoiceId }),
          showSubjectCard && finalResponseText && h(SubjectCard, { 
            message: selectedItem || finalResponseText, 
            setAudioBlob: setAudioBlob, // directly pass the setAudioBlob function
            userInput, 
            voiceId, 
            class: tw`w-auto max-w-xl` 
          }),
        audioBlob && h(AudioPlayer, { audioBlob: audioBlob, setIsLoading, audioRef, class: tw`w-full` })
      ])
    ])
  ])
};
