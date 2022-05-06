import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDev } from "@fortawesome/free-brands-svg-icons";
import RequestFriendForm from "../forms/RequestFriendForm";
import { acceptFriendRequest } from "../../assets/api";
import { useContext } from "react";
import { UserContext } from "../../RouteSwitch.js";

export default function AddFriends({ setShowAddFriends }) {
  const { user, setUser } = useContext(UserContext);
  const { sentFriendRequests, receivedFriendRequests } = user;
  return (
    <div className="AddFriendsBackdrop">
      <div className="AddFriends">
        <FontAwesomeIcon
          onClick={() => setShowAddFriends(false)}
          icon={faCircleXmark}
          className="iconClose"
        />
        {/* Input form to request a new friend */}
        <RequestFriendForm setUser={setUser} />

        {/* Container for requests sent out by user */}
        <div className="sentRequests">
          {sentFriendRequests.length > 0 ? (
            <p className="title">Pending Requests</p>
          ) : (
            <p className="titleEmpty">No Pending Requests</p>
          )}
          {sentFriendRequests.map((sentRequest, i) => {
            return <SentFriendRequest key={i} sentRequest={sentRequest} />;
          })}
        </div>

        {/* Container for requests received for user */}
        <div className="receivedRequests">
          {receivedFriendRequests.length > 0 ? (
            <p className="title">Requests Received</p>
          ) : (
            <p className="titleEmpty">No Requests Received</p>
          )}
          {receivedFriendRequests.map((receivedRequest, i) => {
            return (
              <FriendRequest
                key={i}
                receivedRequest={receivedRequest}
                setUser={setUser}
              />
            );
          })}
        </div>

        {/* Socials Container */}
        <ul className="socialsContainer">
          <li>
            <FontAwesomeIcon icon={faGithub} className="socialIcon" />
          </li>
          <li>
            <FontAwesomeIcon icon={faDev} className="socialIcon" />
          </li>
        </ul>
      </div>
    </div>
  );
}

// Represents a individual that has requested the user as a friend.
function FriendRequest({ receivedRequest, setUser }) {
  // Accept friend request and have API add user to friends.
  const handleAcceptRequest = async (friendId) => {
    try {
      const user = await acceptFriendRequest(friendId);
      setUser(user);
    } catch (error) {
      alert("Error adding friend");
    }
  };

  return (
    <div className="FriendRequest">
      <img
        className="userPicture"
        src={receivedRequest._id.profilePicture}
        alt=""
      />

      <div className="userInfo">
        <p>{receivedRequest._id.fullName}</p>
        <div className="actionButtons">
          <button
            className="confirm"
            onClick={() => handleAcceptRequest(receivedRequest._id._id)}
          >
            Accept
          </button>
          <button>Deny</button>
        </div>
      </div>
    </div>
  );
}

// Represents an individual that the user has sent a friend request to.
function SentFriendRequest({ sentRequest }) {
  return (
    <div className="SentFriendRequest">
      <img
        className="userPicture"
        src={sentRequest._id.profilePicture}
        alt=""
      />
      <p>{sentRequest._id.fullName}</p>
    </div>
  );
}
