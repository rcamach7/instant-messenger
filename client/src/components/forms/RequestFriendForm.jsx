import { useState } from "react";
import config from "../../assets/config.json";
import axios from "axios";

export default function RequestFriendForm({ refreshFriendsInformation }) {
  const [friendUsername, setFriendUsername] = useState("");
  const [errors, setErrors] = useState([]);

  // Process submission of form
  const handleFriendRequest = (e) => {
    e.preventDefault();
    axios
      .post(`${config.apiUrl}/users/friends/request`, {
        friendUsername: friendUsername.toLowerCase(),
      })
      // Upon successful request, we will reset the state fields.
      .then(() => {
        setErrors([]);
        setFriendUsername("");
        refreshFriendsInformation();
      })
      // Will catch any errors returned from the API and display them
      .catch((error) => {
        setErrors([error.response.data.msg]);
      });
  };

  return (
    <form className="addNewFriend" onSubmit={(e) => handleFriendRequest(e)}>
      <label htmlFor="friendUsername">
        <p>Add New Friend</p>
      </label>
      <input
        type="text"
        id="friendUsername"
        minLength="4"
        autoComplete="off"
        value={friendUsername}
        onChange={(e) => setFriendUsername(e.target.value)}
        required
      />
      <ul className="submission-errors">
        {errors.map((err, i) => {
          return (
            <li key={i} className="error">
              {err}
            </li>
          );
        })}
      </ul>
    </form>
  );
}
