import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faBars,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { v4 } from "uuid";
import ChatRow from "./subComponents/ChatRow";
import Profile from "./subComponents/Profile";
import AddFriends from "./subComponents/AddFriends";

function MenuBar(props) {
  const [showProfile, setShowProfile] = useState(false);
  const [showAddFriends, setShowAddFriends] = useState(false);
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

      {/* Main container that holds all different friends */}
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

      {/* Hidden Tabs */}
      {showProfile ? (
        <Profile
          setStoredJwt={props.setStoredJwt}
          setShowProfile={setShowProfile}
          user={props.user}
          setUser={props.setUser}
          toggleTheme={props.toggleTheme}
        />
      ) : null}
      {showAddFriends ? (
        <AddFriends
          setShowAddFriends={setShowAddFriends}
          receivedFriendRequests={props.receivedFriendRequests}
          sentFriendRequests={props.sentFriendRequests}
          refreshFriendsInformation={props.refreshFriendsInformation}
        />
      ) : null}
    </aside>
  );
}

export default MenuBar;
