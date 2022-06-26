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

function MenuBar({
  style,
  activeFriendChat,
  setMobileSwapSection,
  setActiveFriendChat,
  setRoomSocket,
}) {
  const { user } = useUserContext();
  const [showProfile, setShowProfile] = useState(false);
  const [showAddFriends, setShowAddFriends] = useState(false);

  // Generate a collection of chat rows given the users friends.
  const sortedFriends = sortFriends([...(user ? user.friends : [])]);
  const chatRows = sortedFriends.map((chat) => {
    return (
      <ChatRow
        key={v4()}
        // If this current chat row is the current active one - background will be slightly different.
        activeStyle={
          activeFriendChat.friendId === chat.friend._id ? "activeChat" : ""
        }
        chat={chat}
        setMobileSwapSection={setMobileSwapSection}
        setActiveFriendChat={setActiveFriendChat}
        setRoomSocket={setRoomSocket}
      />
    );
  });

  return (
    <aside className="MenuBar" style={style}>
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

      {/* Profile Page Tab */}
      {showProfile ? <Profile setShowProfile={setShowProfile} /> : null}
      {/* Friends Tab */}
      {showAddFriends ? (
        <AddFriends
          sentFriendRequests={user ? user.sentFriendRequests : []}
          receivedFriendRequests={user ? user.receivedFriendRequests : []}
          setShowAddFriends={setShowAddFriends}
        />
      ) : null}
    </aside>
  );
}

export default MenuBar;
