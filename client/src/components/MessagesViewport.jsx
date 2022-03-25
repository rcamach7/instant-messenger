import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { v4 } from "uuid";
import io from "socket.io-client";
import NewMessageForm from "./forms/NewMessageForm";
import Message from "./subComponents/Message";

// Create a live socket connection to our server to listen to events.
const socket = io.connect("http://localhost:2000", {
  transports: ["websocket"],
});

function MessagesViewport(props) {
  const messages = props.activeFriendChat.messages;

  // Sort messages whenever a new one comes in.
  useEffect(() => {
    messages.sort((a, b) => b.timestamp - a.timestamp);

    // Scroll user to the bottom every time they load a chat or receive a message.
    const element = document.getElementById("messagesContainer");
    element.scrollTop = element.scrollHeight;
  }, [messages]);

  // If friendship ID exists for the active chat, we will join a specific room to listen for messages between this friend
  useEffect(() => {
    if (props.roomSocket !== null) {
      socket.emit("join", { _id: props.roomSocket });
    }
  }, [props.roomSocket]);

  // When our message, or a message from a friends is saved on DB, it will emit a signal to both us us (if connected) to save our new message.
  useEffect(() => {
    socket.on("chat message", (newFriendMessage) => {
      props.setActiveFriendChat({
        ...props.activeFriendChat,
        messages: [...props.activeFriendChat.messages, newFriendMessage],
      });
    });
  }, [props]);

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
          <li>{<FontAwesomeIcon className="icon" icon={faUserGear} />}</li>
        </ul>
      </nav>

      <div className="chatContainer">
        <div className="messagesContainer" id="messagesContainer">
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
