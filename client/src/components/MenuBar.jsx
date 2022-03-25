import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserGear,
  faCircleXmark,
  faCircle,
  faMoon,
  faXmark,
  faHeartCrack,
} from "@fortawesome/free-solid-svg-icons";
import { v4 } from "uuid";
import ChatRow from "./subComponents/ChatRow";

function MenuBar(props) {
  const [showProfile, setShowProfile] = useState(false);
  // Generate a collection of chat rows given the users friends.
  const chatRows = props.friends.map((chat) => {
    return (
      <ChatRow
        key={v4()}
        chat={chat}
        setMobileSwapSection={props.setMobileSwapSection}
        setActiveFriendChat={props.setActiveFriendChat}
        setRoomSocket={props.setRoomSocket}
      />
    );
  });

  return (
    <aside className="MenuBar" style={props.style}>
      <nav className="navbar">
        <ul>
          <li>
            {
              <FontAwesomeIcon
                className="icon"
                icon={faUserGear}
                onClick={() => setShowProfile(true)}
              />
            }
          </li>
          <li>Friends</li>
          <li>{<FontAwesomeIcon className="icon" icon={faUserPlus} />}</li>
        </ul>
      </nav>

      <div className="chatRowsContainer">{chatRows}</div>

      {/* Hidden Profile Tab */}
      {showProfile ? (
        <Profile setShowProfile={setShowProfile} user={props.user} />
      ) : null}
    </aside>
  );
}

function Profile(props) {
  return (
    <div className="ProfileBackdrop">
      <div className="Profile">
        <ul className="topBar">
          <li onClick={() => props.setShowProfile(false)}>
            <FontAwesomeIcon icon={faCircleXmark} className="iconClose" />
          </li>
        </ul>

        <div className="profileInformation">
          <p className="profileImage">
            <FontAwesomeIcon icon={faCircle} style={{ fontSize: "150px" }} />
          </p>
          <p>{props.user.fullName}</p>
          <p>({props.user.username})</p>
        </div>

        <nav className="profileButtons">
          <ul className="buttonList">
            <li>
              <FontAwesomeIcon className="buttonIcon" icon={faMoon} />
              <button>Toggle Dark Mode</button>
            </li>
            <li>
              <FontAwesomeIcon className="buttonIcon" icon={faXmark} />
              <button>Log Out</button>
            </li>
            <li>
              <FontAwesomeIcon className="buttonIcon" icon={faHeartCrack} />
              <button>Report A Problem</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default MenuBar;
