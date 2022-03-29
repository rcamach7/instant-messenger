import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import axios from "axios";

export default function AddFriends(props) {
  const [friendUsername, setFriendUsername] = useState("");
  const [errors, setErrors] = useState([]);

  const handleFriendRequest = (e) => {
    e.preventDefault();
    axios
      .post("/users/friends/request", { friendUsername: friendUsername })
      .then(() => {
        setErrors([]);
        setFriendUsername("");
      })
      .catch((error) => {
        setErrors([error.response.data.msg]);
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
        <form className="addNewFriend" onSubmit={(e) => handleFriendRequest(e)}>
          <label htmlFor="friendUsername">Add New Friend</label>
          <input
            type="text"
            id="friendUsername"
            minLength="4"
            autoComplete="off"
            value={friendUsername}
            onChange={(e) => setFriendUsername(e.target.value)}
            required
          />
          <ul>
            {errors.map((err, i) => {
              return (
                <li key={i} className="error">
                  {err}
                </li>
              );
            })}
          </ul>
        </form>

        <ul className="myRequests"></ul>
      </div>
    </div>
  );
}
