import{Jt}from"./chunk-BMKRBKO4.js";import{k}from"./chunk-JEHWBBA4.js";import{le}from"./chunk-4M2GZMYH.js";function SubjectCard({message,voiceId,setAudioBlob}){let data;try{data=JSON.parse(message.choices[0].message.function_call.arguments)}catch(error){console.error("Error parsing message:",error),data={}}let{title,explanation,keywords}=data,[isCollapsed,setIsCollapsed]=k(!0),[isLoading,setIsLoading]=k(!1),[isListening,setIsListening]=k(!1);console.log("Title: "+title),console.log("Explanation: "+explanation);let handleListen=async()=>{setIsLoading(!0),setIsListening(!0);let textToConvert=`${title}. ${explanation}`,response=await fetch("/api/audio",{method:"POST",body:JSON.stringify({script:textToConvert,voiceId}),headers:{"Content-Type":"application/json"}});if(response.ok){let blob=await response.blob();return console.log("Blob:",blob),setAudioBlob(blob),setIsLoading(!1),setIsListening(!1),blob}};return le("div",{class:Jt`flex flex-col mb-8 items-center justify-center bg-white p-6 rounded-lg shadow-lg cursor-pointer p-4 m-4 mx-auto max-w-3xl`},[le("h1",{class:Jt`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-600 text-center`},title),keywords&&le("div",{class:Jt`flex flex-wrap gap-2 mb-4 justify-center`},Object.values(keywords).map(keyword=>le("span",{class:Jt`border-blue-200 bg-white text-blue-700 rounded-full px-2 py-1 text-sm font-semibold`},keyword))),!isCollapsed&&le("p",{class:Jt`text-md mb-4 text-gray-700 text-center`},explanation),le("div",{class:Jt`flex gap-2`},[le("button",{onClick:()=>setIsCollapsed(!isCollapsed),class:Jt`mt-auto text-sm bg-gray-200 text-gray-500 border border-gray-700 p-2 rounded-full opacity-50 focus:outline-none`},isCollapsed?"Show Text":"Hide Text"),!isListening&&le("button",{onClick:handleListen,class:Jt`bg-[#38A1FF] hover:bg-[#318BDC] mt-auto text-sm font-semibold text-white border p-2 rounded-full focus:outline-none`},isLoading?"Loading...":"Listen"),isListening&&le("div",{class:Jt`audio-spinner absolute bottom-10 left-1/2 transform p-4 text-center`})])])}export{SubjectCard};
//# sourceMappingURL=chunk-K765WSJR.js.map
