import { h } from "preact";
import { useState } from "preact/hooks";
import { tw } from "twind";

export default function SubjectCard({ message }) {
  const data = JSON.parse(message);
  const { title, explanation, keywords } = data;
  const [isCollapsed, setIsCollapsed] = useState(true);
  
  return h("div", { 
    class: tw`flex flex-col mb-8 items-center justify-center bg-white p-6 rounded-lg shadow-lg cursor-pointer p-4 m-4 mx-auto max-w-3xl`
  }, [
    h("h1", { class: tw`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-600 text-center` }, title),
    h("div", { class: tw`flex flex-wrap gap-2 mt-4 mb-4 justify-center` }, 
      Object.values(keywords).map(keyword => 
        h("span", { class: tw`bg-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold` }, keyword)
    )),
    !isCollapsed && h("p", { class: tw`text-md mb-4 text-gray-700 text-center` }, explanation),
    h("button", { 
        onClick: () => setIsCollapsed(!isCollapsed),
        class: tw`mt-auto text-sm bg-gray-200 text-gray-500 border border-gray-700 p-2 rounded-full opacity-50 focus:outline-none`
      }, isCollapsed ? "Show Text" : "Hide Text")
  ]);
}
