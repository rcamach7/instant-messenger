import { UserContext } from "../../RouteSwitch";
import { useContext } from "react";

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
    </li>
  );
}

export default Message;
