import { useEffect, useState } from "react";
import axios from "axios";

export default function MessagesContainer(props) {
  const messages = props.messagesView;
  const friend = props.friend;

  // Form state
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    messages.sort((a, b) => b.timestamp - a.timestamp);
  }, [messages]);

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
      })
      .then((result) => {
        props.setMessagesView((prevState) => [...prevState, result.data]);
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
