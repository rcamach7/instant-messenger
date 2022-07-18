import { useState } from "react";
import { sortFriends } from "../data/helperFunctions";
import { v4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faBars,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import ChatRow from "./menuBarComponents/ChatRow";
import Profile from "./menuBarComponents/Profile";
import AddFriends from "./menuBarComponents/AddFriends/AddFriends";
import { useUserContext } from "../context/UserContext";

function MenuBar({ style, setMobileSwapSection }) {
  const { user, activeFriendChat } = useUserContext();

  const [showProfile, setShowProfile] = useState(false);
  const [showAddFriends, setShowAddFriends] = useState(false);

  // Generate a collection of chat rows given the users friends.
  const sortedFriends = sortFriends([...(user ? user.friends : [])]);
  // List of each friend that provides a preview of last message sent.
  const chatRows = sortedFriends.map((chat) => {
    return (
      <ChatRow
        key={v4()}
        activeStyle={
          activeFriendChat.friendId === chat.friend._id ? "activeChat" : ""
        }
        chat={chat}
        setMobileSwapSection={setMobileSwapSection}
      />
    );
  });

  return (
    <aside className="MenuBar" style={style}>
      {/* Component specific navigation bar for our MenuBar */}
      <nav className="navbar">
        <ul className="tabs-buttons">
          <li>
            {
              <FontAwesomeIcon
                className="icon"
                icon={faBars}
                onClick={() => setShowProfile(true)}
              />
            }
          </li>
          <li>Friends</li>
          <li>
            {
              <FontAwesomeIcon
                className="icon"
                icon={faUserPlus}
                onClick={() => setShowAddFriends(true)}
              />
            }
          </li>
        </ul>
      </nav>

      {/* Main container that holds all different friends, with recent message preview. */}
      <div className="chatRowsContainer">{chatRows}</div>

      {/* Container that holds social icons */}
      <ul className="personalSocialsContainer">
        <li
          onClick={() => window.open("https://github.com/rcamach7", "_blank")}
        >
          <FontAwesomeIcon icon={faGithub} className="icon" />
        </li>
        <li
          onClick={() =>
            window.open("https://www.ricardo-camacho.dev/", "_blank")
          }
        >
          <FontAwesomeIcon icon={faBriefcase} className="icon" />
        </li>
        <li>
          <FontAwesomeIcon icon={faLinkedin} className="icon" />
        </li>
      </ul>

      {/* Popup tabs that display over component once triggered by the navbar */}
      {showProfile && <Profile setShowProfile={setShowProfile} />}
      {showAddFriends && (
        <AddFriends
          sentFriendRequests={user ? user.sentFriendRequests : []}
          receivedFriendRequests={user ? user.receivedFriendRequests : []}
          setShowAddFriends={setShowAddFriends}
        />
      )}
    </aside>
  );
}

export default MenuBar;
