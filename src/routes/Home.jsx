import { useState } from "react";
import MenuBar from "../components/MenuBar";
import MessagesViewport from "../components/MessagesViewport";

export default function Home() {
  const [mobileSwapSection, setMobileSwapSection] = useState(false);

  return (
    <main className="Home">
      <MenuBar
        style={{ display: mobileSwapSection ? "none" : "flex" }}
        setMobileSwapSection={setMobileSwapSection}
      />
      <MessagesViewport
        style={{ display: mobileSwapSection ? "block" : "none" }}
        setMobileSwapSection={setMobileSwapSection}
      />
    </main>
  );
}
