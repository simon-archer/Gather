import{AudioPlayer}from"./chunk-NZJ7I3BT.js";import{InputField}from"./chunk-H2Y7D4QB.js";import{SubjectCard}from"./chunk-K765WSJR.js";import{Jt}from"./chunk-BMKRBKO4.js";import{j,k,w}from"./chunk-JEHWBBA4.js";import{A,le}from"./chunk-4M2GZMYH.js";function UnifiedIsland(){let audioRef=w(typeof Audio<"u"?new Audio:null),[finalResponseText,setFinalResponseText]=k(""),[textId,setTextId]=k(null),[isLoading,setIsLoading]=k(!1),[isCollapsed,setIsCollapsed]=k(!0),[selectedItem,setSelectedItem]=k(null),[showSubjectCard,setShowSubjectCard]=k(!0),[userInput,setUserInput]=k(""),[voiceId,setVoiceId]=k(""),[audioBlob,setAudioBlob]=k(null);j(()=>{let savedVoiceId=localStorage.getItem("voiceId");savedVoiceId&&setVoiceId(JSON.parse(savedVoiceId))},[]),j(()=>{localStorage.setItem("voiceId",JSON.stringify(voiceId)),console.log("Set voiceID to Localstorage: "+voiceId)},[voiceId]),j(()=>{console.log("Voice ID: "+voiceId)},[voiceId]);let handleTextGenerated=(text,id)=>{setFinalResponseText({choices:[{message:{function_call:{arguments:text}}}]}),setTextId(id)};return le("div",{class:Jt`flex flex-row items-center justify-center min-h-screen`},[isCollapsed&&le(A,{},[le("button",{onClick:()=>{setFinalResponseText(""),setSelectedItem(null),setShowSubjectCard(!0),setAudioBlob(null)},class:Jt`fixed z-10 top-5 right-0 transform -translate-x-1/2 w-12 h-12 bg-[#38A1FF] hover:bg-[#318BDC] text-white font-semibold flex justify-center items-center rounded-full shadow-lg`},[le("svg",{class:Jt`fill-current text-white`,width:"24",height:"24"},le("path",{d:"M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"}))]),le("div",{class:Jt`flex flex-col items-center justify-center z-0 w-full p-4`},[!selectedItem&&(!finalResponseText||finalResponseText==="")&&le(InputField,{setFinalResponseText:handleTextGenerated,isLoading,setIsLoading,voiceId,setVoiceId}),showSubjectCard&&finalResponseText&&le(SubjectCard,{message:selectedItem||finalResponseText,setAudioBlob,userInput,voiceId,class:Jt`w-auto max-w-xl`}),audioBlob&&le(AudioPlayer,{audioBlob,setIsLoading,audioRef,class:Jt`w-full`})])])])}export{UnifiedIsland as default};
//# sourceMappingURL=island-unifiedisland_unifiedisland_default.js.map
