import { useUserContext } from "../../context/UserContext";
import moment from "moment";

function Message({ message }) {
  const { user } = useUserContext();

  return (
    <li className="Message">
      {/* Message content */}
      <span
        className={
          "messageContent " +
          (message.from === user._id ? "myMessage" : "friendMessage")
        }
      >
        {message.message}
      </span>

      {/* Timestamp for message */}
      <span
        className={
          message.from === user._id ? "timeStampRight" : "timeStampLeft"
        }
      >
        {moment(message.timestamp).fromNow()}
      </span>
    </li>
  );
}

export default Message;
