import { useState, useEffect } from "react";
import MenuBar from "../components/MenuBar";
import MessagesViewport from "../components/MessagesViewport";
import axios from "axios";

function Home() {
  return (
    <main className="Home">
      <MenuBar />
      <MessagesViewport />
    </main>
  );
}

export default Home;
