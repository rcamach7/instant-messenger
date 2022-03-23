import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserPlus,
  faUserGear,
  faCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import testData from "../assets/testData.json";

function MenuBar() {
  const [friendsList, setFriendsList] = useState(testData);
  const friendsSquares = friendsList.map((friend, i) => {
    return <FriendSquare key={i} friend={friend} />;
  });

  return (
    <aside className="MenuBar">
      <nav className="navbar">
        <ul>
          <li>{<FontAwesomeIcon icon={faUserGear} />}</li>
          <li style={{ fontWeight: "bold" }}>Friends</li>
          <li>{<FontAwesomeIcon icon={faUserPlus} />}</li>
        </ul>
      </nav>

      <div className="friendsSquareContainer">{friendsSquares}</div>
    </aside>
  );
}

function FriendSquare(props) {
  return (
    <section className="FriendSquare">
      <span>{<FontAwesomeIcon icon={faCircle} className="userIcon" />}</span>
      <div className="contactInfo">
        <p className="friendName">{props.friend.fullName}</p>
        <p className="messagePreview">{props.friend.lastMessage}</p>
      </div>
    </section>
  );
}

export default MenuBar;
