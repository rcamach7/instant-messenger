import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faBars } from "@fortawesome/free-solid-svg-icons";
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

      <div className="chatRowsContainer">{chatRows}</div>

      {/* Hidden Tabs */}
      {showProfile ? (
        <Profile
          setShowProfile={setShowProfile}
          user={props.user}
          setUser={props.setUser}
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
