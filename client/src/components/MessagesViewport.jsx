import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";
import { v4 } from "uuid";
import io from "socket.io-client";

// Create a live socket connection to our server to listen to events.
const socket = io.connect("http://localhost:2000", {
  transports: ["websocket"],
});

function MessagesViewport(props) {
  const [newMessage, setNewMessage] = useState("");
  const messages = props.activeFriendChat.messages;

  // Sort messages whenever a new one comes in.
  useEffect(() => {
    messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  // If friendship ID exists for the active chat, we will join a specific room to listen for messages between this friend
  useEffect(() => {
    if (props.roomSocket !== null) {
      socket.emit("join", { _id: props.roomSocket });
    }
  }, [props.roomSocket]);

  // Create a new message after form submission.
  const handleNewMessage = (e) => {
    e.preventDefault();
    axios
      .post("/users/friends/messages", {
        friendUsername: props.activeFriendChat.friendUsername,
        message: newMessage,
        // _id field is passed to emit a socket signal to any users in a room with this identifier.
        _id: props.roomSocket,
      })
      .then(() => {
        setNewMessage("");
      });
  };

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
          <li onClick={() => props.setMobileSwapSection(false)}>
            {<FontAwesomeIcon className="icon" icon={faCaretLeft} />}
          </li>
          <li>{props.activeFriendChat.fullName}</li>
          <li>{<FontAwesomeIcon className="icon" icon={faUserGear} />}</li>
        </ul>
      </nav>

      <div className="chatContainer">
        <div className="messagesContainer">
          <ul>
            {messages.map((message) => {
              return (
                <li
                  key={v4()}
                  className={
                    "message " +
                    (message.from === props.user._id
                      ? "myMessage"
                      : "friendMessage")
                  }
                >
                  <span>{message.message}</span>
                </li>
              );
            })}
          </ul>
        </div>

        <form className="newMessageForm" onSubmit={(e) => handleNewMessage(e)}>
          <input
            id="message"
            className="textBox"
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Send message"
            autoComplete="off"
            minLength="2"
          />
          <input className="submitBtn" id="submit-btn" type="submit" />
        </form>
      </div>
    </aside>
  );
}

export default MessagesViewport;
