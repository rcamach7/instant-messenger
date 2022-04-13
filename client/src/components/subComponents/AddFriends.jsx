import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import RequestFriendForm from "../forms/RequestFriendForm";
import axios from "axios";

export default function AddFriends(props) {
  return (
    <div className="AddFriendsBackdrop">
      <div className="AddFriends">
        <FontAwesomeIcon
          onClick={() => props.setShowAddFriends(false)}
          icon={faCircleXmark}
          className="iconClose"
        />
        {/* Input form to request a new friend */}
        <RequestFriendForm
          refreshFriendsInformation={props.refreshFriendsInformation}
        />

        {/* Container for requests sent out by user */}
        <div className="sentRequests">
          {props.sentFriendRequests.length > 0 ? (
            <p className="title">Pending Requests</p>
          ) : (
            <p className="titleEmpty">No Pending Requests</p>
          )}
          {props.sentFriendRequests.map((sentRequest, i) => {
            return <SentFriendRequest key={i} sentRequest={sentRequest} />;
          })}
        </div>

        {/* Container for requests received for user */}
        <div className="receivedRequests">
          {props.receivedFriendRequests.length > 0 ? (
            <p className="title">Requests Received</p>
          ) : (
            <p className="titleEmpty">No Requests Received</p>
          )}
          {props.receivedFriendRequests.map((receivedRequest, i) => {
            return (
              <FriendRequest
                key={i}
                receivedRequest={receivedRequest}
                refreshFriendsInformation={props.refreshFriendsInformation}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// Represents a individual that has requested the user as a friend.
function FriendRequest(props) {
  const handleAcceptRequest = (friendUsername) => {
    axios
      .post("/users/friends/", { friendUsername: friendUsername })
      .then(() => {
        // Query up to date friend information and update state.
        props.refreshFriendsInformation();
      });
  };

  return (
    <div className="FriendRequest">
      <img
        className="userPicture"
        src={props.receivedRequest._id.profilePicture}
        alt=""
      />

      <div className="userInfo">
        <p>{props.receivedRequest._id.fullName}</p>
        <div className="actionButtons">
          <button
            className="confirm"
            onClick={() =>
              handleAcceptRequest(props.receivedRequest._id.username)
            }
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
function SentFriendRequest(props) {
  return (
    <div className="SentFriendRequest">
      <img
        className="userPicture"
        src={props.sentRequest._id.profilePicture}
        alt=""
      />
      <p>{props.sentRequest._id.fullName}</p>
    </div>
  );
}
