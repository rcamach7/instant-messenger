function Message(props) {
  const { user, message } = props;

  return (
    <li className="Message">
      <span
        className={
          "messageContent " +
          (message.from === user._id ? "myMessage" : "friendMessage")
        }
      >
        {message.message}
      </span>
    </li>
  );
}

export default Message;
