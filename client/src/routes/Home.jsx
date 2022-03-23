import { useState, useEffect } from "react";
import MenuBar from "../components/MenuBar";
import MessagesViewport from "../components/MessagesViewport";
import axios from "axios";

function Home(props, { children }) {
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <main className="Home">
      <MenuBar />
      <MessagesViewport />

      {/* Buttons for testing purposes */}
      <div
        className="testButtons"
        style={{
          position: "absolute",
          bottom: "5px",
          left: "5px",
        }}
      >
        <button onClick={() => handleSignOut()}>Log Out</button>
        <button onClick={() => console.log(props)}>Log User</button>
      </div>
    </main>
  );
}

export default Home;
