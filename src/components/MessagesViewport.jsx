import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { v4 } from "uuid";
import { NewMessageForm } from "./forms/";
import Message from "./messagesViewportComponents/Message";
import { useSocketConnection } from "../hooks/";
import { useUserContext } from "../context/UserContext";

function MessagesViewport({ style, setMobileSwapSection }) {
  const { setTheme, roomSocket, activeFriendChat, setActiveFriendChat } =
    useUserContext();
  const messages = activeFriendChat.messages;
  // Manages socket connection based on current active chat.
  useSocketConnection(roomSocket, setActiveFriendChat);

  // Sort messages whenever a new one comes in.
  useEffect(() => {
    messages.sort((a, b) => b.timestamp - a.timestamp);

    // Scroll user to the bottom every time they load a chat or receive a message.
    const element = document.getElementById("messagesContainer");
    element.scrollTop = element.scrollHeight;
  }, [messages]);

  return (
    <aside className="MessagesViewport" style={style}>
      <nav className="navbar">
        <ul>
          <li
            className="mobileSwitch"
            onClick={() => setMobileSwapSection(false)}
          >
            {<FontAwesomeIcon className="icon" icon={faCaretLeft} />}
          </li>
          <li>{activeFriendChat.fullName}</li>
          <li>
            <FontAwesomeIcon
              icon={faMoon}
              className="icon"
              onClick={() =>
                setTheme((prevState) =>
                  prevState === "light" ? "dark" : "light"
                )
              }
            />
          </li>
        </ul>
      </nav>

      <div className="chatContainer">
        <div
          className="messagesContainer disable-scrollbars"
          id="messagesContainer"
        >
          <ul>
            {messages.map((message) => {
              return <Message key={v4()} message={message} />;
            })}
          </ul>
        </div>

        <NewMessageForm />
      </div>
    </aside>
  );
}

export default MessagesViewport;
