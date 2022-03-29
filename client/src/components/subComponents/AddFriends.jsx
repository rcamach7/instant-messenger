import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import RequestFriendForm from "../forms/RequestFriendForm";

export default function AddFriends(props) {
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

        <ul className="myRequests"></ul>
      </div>
    </div>
  );
}
