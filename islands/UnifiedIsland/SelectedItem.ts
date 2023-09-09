import { h } from "preact";
import { tw } from "twind";

function formatDate(dateString: string) {
    const date = new Date(dateString);
    const diffInDays = Math.floor((new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays <= 7) {
      // Assuming 'datetime' doesn't have a 'formatDistanceToNow' function, 
      // we'll handle it manually (though this is a basic version):
      if (diffInDays === 0) return "Today";
      if (diffInDays === 1) return "Yesterday";
      return `${diffInDays} days ago`;
    } else {
      // Using the 'format' function from 'datetime' as you initially did:
      return format(date, 'dd/MM');
    }
  } 

export default function SelectedItem({ item }) {
  return h("div", { class: tw`flex flex-col items-center justify-center`}, [
    h("h2", { class: tw`text-xl font-bold` }, item.title),
    h("p", {}, item.text),
    h("audio", {
      controls: true,
      src: item.audio_url,
      class: tw`w-full p-2`
    }, "Your browser does not support the audio element.")
  ]);
}