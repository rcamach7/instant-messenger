function Message(props) {
  const { user, message } = props;

  return (
    <li
      className={
        "Message " + (message.from === user._id ? "myMessage" : "friendMessage")
      }
    >
      <span>{message.message}</span>
    </li>
  );
}

export default Message;
