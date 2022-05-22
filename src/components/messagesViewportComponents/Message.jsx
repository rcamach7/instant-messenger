import { useUserContext } from "../../hooks/useUserContext";
import moment from "moment";

function Message({ message }) {
  const { user } = useUserContext();

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
