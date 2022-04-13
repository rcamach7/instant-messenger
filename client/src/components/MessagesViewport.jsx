import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faMoon } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { v4 } from "uuid";
import NewMessageForm from "./forms/NewMessageForm";
import Message from "./subComponents/Message";
import useSocketConnection from "../hooks/useSocketConnection";

function MessagesViewport(props) {
  const messages = props.activeFriendChat.messages;
  // Manages socket connection based on current active chat.
  useSocketConnection(props);

  // Sort messages whenever a new one comes in.
  useEffect(() => {
    messages.sort((a, b) => b.timestamp - a.timestamp);

    // Scroll user to the bottom every time they load a chat or receive a message.
    const element = document.getElementById("messagesContainer");
    element.scrollTop = element.scrollHeight;
  }, [messages]);

  return (
    <aside className="MessagesViewport" style={props.style}>
      <nav className="navbar">
        <ul>
          <li
            className="mobileSwitch"
            onClick={() => props.setMobileSwapSection(false)}
          >
            {<FontAwesomeIcon className="icon" icon={faCaretLeft} />}
          </li>
          <li>{props.activeFriendChat.fullName}</li>
          <li>
            <FontAwesomeIcon
              icon={faMoon}
              className="icon"
              onClick={() => props.toggleTheme()}
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
              return <Message key={v4()} message={message} user={props.user} />;
            })}
          </ul>
        </div>

        <NewMessageForm
          activeFriendChat={props.activeFriendChat}
          roomSocket={props.roomSocket}
        />
      </div>
    </aside>
  );
}

export default MessagesViewport;
