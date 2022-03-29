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
      .then((results) => {
        console.log(results);
      });
  };

  return (
    <div className="AddFriendsBackdrop">
      <div className="AddFriends">
        <ul className="topBar">
          <li onClick={() => props.setShowAddFriends(false)}>
            <FontAwesomeIcon icon={faCircleXmark} className="iconClose" />
          </li>
        </ul>

        <h1>Friend Requests</h1>
        <RequestFriendForm />

        <p>Sent Requests</p>
        <ul className="sentRequests">
          {props.sentFriendRequests.map((sentRequest, i) => {
            return (
              <li key={i}>
                <span>{sentRequest._id.fullName}</span>
                <FontAwesomeIcon icon={faSquareCheck} />
                <FontAwesomeIcon icon={faX} />
              </li>
            );
          })}
        </ul>

        <p>Received Requests</p>
        <ul className="receivedRequests">
          {props.receivedFriendRequests.map((receivedRequest, i) => {
            return (
              <li key={i}>
                <span>{receivedRequest._id.fullName}</span>
                <span className="iconContainer">
                  <FontAwesomeIcon
                    icon={faSquareCheck}
                    className="friendIcon"
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
