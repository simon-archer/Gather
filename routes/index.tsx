import { h } from "preact";
import { tw } from "twind";
import UnifiedIsland from "../islands/UnifiedIsland/UnifiedIsland.tsx";

export default function HomePage() {
  return h("div", { class: tw`flex flex-col min-h-screen` }, [
    h(UnifiedIsland, {}),
  ]);
}
