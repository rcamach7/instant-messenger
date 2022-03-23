import { useEffect, useState } from "react";
import axios from "axios";

export default function MessagesContainer(props) {
  const messages = props.messagesView;
  const friend = props.friend;

  // Form state
  const [newMessage, setNewMessage] = useState("");

  // Have user join a room, which is the current active message list, so if the friend is also online, messages can be emmited to both in real time.
  // This will also prevent all connected users to receive messages that don't relate to them.
  useEffect(() => {
    if (props.roomID !== null) {
      props.socket.emit("join", { _id: props.roomID });
    }
  }, [props.roomID]);

  useEffect(() => {
    messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

  // Listen for new messages being emitted
  useEffect(() => {
    props.socket.on("chat message", (messageIn) => {
      props.setMessagesView((prevState) => [...prevState, messageIn]);
    });
  }, [props.socket]);

  const setMessageStyling = (messageFrom) => {
    if (messageFrom === props.user._id) {
      return "myMessage";
    } else {
      return "receivedMessage";
    }
  };

  const setMessageFrom = (messageFrom) => {
    if (messageFrom === props.user._id) {
      return props.user.username;
    } else {
      return friend;
    }
  };

  const handleNewMessage = (e) => {
    e.preventDefault();
    axios
      .post("/users/friends/messages", {
        friendUsername: friend,
        message: newMessage,
        roomID: props.roomID,
      })
      .then(() => {
        setNewMessage("");
      });
  };

  return (
    <div className="MessagesContainer">
      <ul>
        {messages.map((message, i) => {
          return (
            <li className={setMessageStyling(message.from)} key={i}>
              <span>{message.message}</span>
              <span style={{ fontSize: "10px" }}>
                - {setMessageFrom(message.from)}
              </span>
            </li>
          );
        })}
      </ul>

      <form className="newMessageForm" onSubmit={(e) => handleNewMessage(e)}>
        <input
          id="message"
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <input id="submit-btn" type="submit" />
      </form>
    </div>
  );
}
