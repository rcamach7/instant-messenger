import { useState } from "react";
import axios from "axios";

export default function RequestFriendForm(props) {
  const [friendUsername, setFriendUsername] = useState("");
  const [errors, setErrors] = useState([]);

  // Process submission of form
  const handleFriendRequest = (e) => {
    e.preventDefault();
    axios
      .post("/users/friends/request", { friendUsername: friendUsername })
      // Upon successful request, we will reset the state fields.
      .then(() => {
        setErrors([]);
        setFriendUsername("");
        props.refreshFriendsInformation();
      })
      // Will catch any errors returned from the API and display them
      .catch((error) => {
        setErrors([error.response.data.msg]);
      });
  };

  return (
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
