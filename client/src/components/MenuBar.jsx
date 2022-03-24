import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";
import ChatRow from "./subComponents/ChatRow";

function MenuBar(props) {
  // Generate a collection of chat rows given the users friends.
  const chatRows = props.friends.map((chat) => {
    return (
      <ChatRow
        key={v4()}
        chat={chat}
        setMobileSwapSection={props.setMobileSwapSection}
        setActiveFriendChat={props.setActiveFriendChat}
      />
    );
  });

  return (
    <aside className="MenuBar" style={props.style}>
      <nav className="navbar">
        <ul>
          <li>{<FontAwesomeIcon className="icon" icon={faUserGear} />}</li>
          <li>Friends</li>
          <li>{<FontAwesomeIcon className="icon" icon={faUserPlus} />}</li>
        </ul>
      </nav>

      <div className="chatRowsContainer">{chatRows}</div>
    </aside>
  );
}

export default MenuBar;
