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

        <RequestFriendForm
          refreshFriendsInformation={props.refreshFriendsInformation}
        />

        <div className="sentRequests">
          <p className="title">REQUESTS SENT</p>
          {props.sentFriendRequests.map((sentRequest, i) => {
            return (
              <div className="sentFriendRequest">
                <img
                  className="userPicture"
                  src={sentRequest._id.profilePicture}
                  alt=""
                />
                <p>{sentRequest._id.fullName}</p>
              </div>
            );
          })}
        </div>

        <div className="receivedRequests">
          <p className="title">REQUESTS RECEIVED</p>
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
            Confirm
          </button>
          <button>Delete</button>
        </div>
      </div>
    </div>
  );
}

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
