import { useState } from "react";
import MenuBar from "../components/MenuBar";
import MessagesViewport from "../components/MessagesViewport";

function Home({ toggleTheme }) {
  const [mobileSwapSection, setMobileSwapSection] = useState(false);
  // Active chat information
  const [roomSocket, setRoomSocket] = useState(null);
  const [activeFriendChat, setActiveFriendChat] = useState({
    friendId: "",
    fullName: "",
    messages: [],
  });

  return (
    <main className="Home">
      <MenuBar
        style={{ display: mobileSwapSection ? "none" : "flex" }}
        activeFriendChat={activeFriendChat}
        toggleTheme={toggleTheme}
        setMobileSwapSection={setMobileSwapSection}
        setActiveFriendChat={setActiveFriendChat}
        setRoomSocket={setRoomSocket}
      />
      <MessagesViewport
        style={{ display: mobileSwapSection ? "block" : "none" }}
        activeFriendChat={activeFriendChat}
        roomSocket={roomSocket}
        toggleTheme={toggleTheme}
        setMobileSwapSection={setMobileSwapSection}
        setActiveFriendChat={setActiveFriendChat}
      />
    </main>
  );
}

export default Home;
