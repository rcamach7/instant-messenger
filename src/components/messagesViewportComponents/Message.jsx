import { UserContext } from "../../RouteSwitch";
import { useContext } from "react";
import moment from "moment";

function Message({ message }) {
  const { user } = useContext(UserContext);

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
