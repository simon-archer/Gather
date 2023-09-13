import { h, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import { tw } from "twind";
import InputField from "./InputField.ts";
import AudioPlayer from "./AudioPlayer.ts";
import SubjectCard from "./SubjectCard.ts";
import { getIP } from "https://deno.land/x/get_ip/mod.ts";
import { insertMetrics } from "../../utils/insertMetrics.ts";

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
  const [userIp, setUserIp] = useState(null);
  const [clickedNew, setClickedNew] = useState(() => {
    const savedClickedNew = localStorage.getItem('clickedNew');
    return savedClickedNew ? JSON.parse(savedClickedNew) : false;
  });

  const getMyIP = async () => {
    const ip = await getIP({ipv6: true});
    console.log(`Your public IP is ${ip}`);
    setUserIp(ip);
    const metrics = {
      ip: ip,
      new: buttonPressCount
    };
    
    // Make a POST request to the insertMetrics endpoint
    const response = await fetch('/api/insertMetrics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(metrics)
    });
  
    if (!response.ok) {
      // Handle error
      console.error('Failed to insert metrics');
    }
  }

  useEffect(() => {
    const savedVoiceId = localStorage.getItem('voiceId');
    if (savedVoiceId) {
      setVoiceId(JSON.parse(savedVoiceId));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('clickedNew', JSON.stringify(clickedNew));
    console.log("Set clickedNew to Localstorage: " + clickedNew)
  }, [clickedNew]);
  
  useEffect(() => {
    localStorage.setItem('voiceId', JSON.stringify(voiceId));
    console.log("Set voiceID to Localstorage: " + voiceId)
  }, [voiceId]);
  
  useEffect(() => {
    console.log("Voice ID: " + voiceId);
  }, [voiceId]);

  const handleTextGenerated = (text, id) => {
    setFinalResponseText({ choices: [{ message: { function_call: { arguments: text } } }] });
    setTextId(id);
  };

  return h("div", { class: tw`flex flex-row items-center justify-center max-h-screen min-h-screen` }, [
    isCollapsed && h(Fragment, {}, [
      finalResponseText && h("button", {
        onClick: () => { setFinalResponseText(""); setSelectedItem(null); setShowSubjectCard(true); setAudioBlob(null); setAudioBlob(null); setClickedNew(true);  },
        class: tw`fixed z-10 top-5 right-0 transform -translate-x-1/2 w-12 h-12 bg-[#38A1FF] hover:bg-[#318BDC] text-white font-semibold flex justify-center items-center rounded-full shadow-lg`,
      }, [
        h("svg", { class: tw`fill-current text-white`, width: "24", height: "24" },
          h("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" })
        )
      ]),
      clickedNew && !isLoading && (!selectedItem && (!finalResponseText || finalResponseText === "")) && h("a", {
        href: "https://forms.gle/453jz6DsTpaQMs6Q6",
        class: tw`fixed z-10 top-0 left-1/2 transform -translate-x-1/2 mt-4 bg-orange-400 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded-full`,
        target: "_blank",
        rel: "noopener noreferrer"
      }, "Give Feedback"),
      h("div", {
        class: tw`flex flex-col items-center justify-center z-0 w-full p-4`
      }, [
        !selectedItem && (!finalResponseText || finalResponseText === "") && h(InputField, { setFinalResponseText: handleTextGenerated, isLoading, setIsLoading, voiceId, setVoiceId }),
          showSubjectCard && finalResponseText && h(SubjectCard, { 
            message: selectedItem || finalResponseText, 
            setAudioBlob: setAudioBlob,
            userInput, 
            voiceId, 
            class: tw`w-auto max-w-xl` 
          }),
        audioBlob && h(AudioPlayer, { audioBlob: audioBlob, setIsLoading, audioRef, class: tw`w-full` })
      ])
    ])
  ])
};
