import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDev } from "@fortawesome/free-brands-svg-icons";
import config from "../../assets/config.json";
import RequestFriendForm from "../forms/RequestFriendForm";
import axios from "axios";

export default function AddFriends({
  sentFriendRequests,
  receivedFriendRequests,
  refreshFriendsInformation,
  setShowAddFriends,
}) {
  return (
    <div className="AddFriendsBackdrop">
      <div className="AddFriends">
        <FontAwesomeIcon
          onClick={() => setShowAddFriends(false)}
          icon={faCircleXmark}
          className="iconClose"
        />
        {/* Input form to request a new friend */}
        <RequestFriendForm
          refreshFriendsInformation={refreshFriendsInformation}
        />

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
                refreshFriendsInformation={refreshFriendsInformation}
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
function FriendRequest({ receivedRequest, refreshFriendsInformation }) {
  const handleAcceptRequest = async (friendUsername) => {
    try {
      await axios.post(`${config.apiUrl}/users/friends`, {
        friendUsername: friendUsername,
      });
      refreshFriendsInformation();
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
            onClick={() => handleAcceptRequest(receivedRequest._id.username)}
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
