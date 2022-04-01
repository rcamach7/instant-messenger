import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSquareCheck,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import RequestFriendForm from "../forms/RequestFriendForm";
import axios from "axios";

export default function AddFriends(props) {
  const handleAcceptRequest = (friendUsername) => {
    axios
      .post("/users/friends/", { friendUsername: friendUsername })
      .then(() => {
        // Query up to date friend information and update state.
        props.refreshFriendsInformation();
      });
  };

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

        <ul className="sentRequests">
          <p>Sent Requests</p>
          {props.sentFriendRequests.map((sentRequest, i) => {
            return (
              <li key={i}>
                <span>{sentRequest._id.fullName}</span>
              </li>
            );
          })}
        </ul>

        <ul className="receivedRequests">
          <p>Received Requests</p>
          {props.receivedFriendRequests.map((receivedRequest, i) => {
            return (
              <li key={i}>
                <span>{receivedRequest._id.fullName}</span>
                <span className="iconContainer">
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    className="friendIcon"
                    onClick={() =>
                      handleAcceptRequest(receivedRequest._id.username)
                    }
                  />
                  <FontAwesomeIcon icon={faX} className="friendIcon" />
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
