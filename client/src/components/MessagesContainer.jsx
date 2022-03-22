import { useEffect } from "react";

export default function MessagesContainer(props) {
  const messages = props.messagesView;
  const friend = props.friend;

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
    </div>
  );
}
