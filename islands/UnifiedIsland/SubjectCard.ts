import { h } from "preact";
import { tw } from "twind";

export default function SubjectCard({ message }) {
  const data = JSON.parse(message);
  const { title, explanation, keywords } = data;
  
  return h("div", { class: tw`flex flex-col mb-8 items-center bg-white p-6 rounded-lg shadow-lg cursor-pointer` }, [
    h("h1", { class: tw`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-600` }, title),
    h("h2", { class: tw`text-xl font-semibold mb-4 text-gray-700` }, explanation),
    h("div", { class: tw`flex flex-wrap gap-2 mt-4` }, 
      Object.values(keywords).map(keyword => 
        h("span", { class: tw`bg-blue-200 text-blue-700 rounded-full px-3 py-1 text-sm font-semibold` }, keyword)
      )
    ),
  ]);
}