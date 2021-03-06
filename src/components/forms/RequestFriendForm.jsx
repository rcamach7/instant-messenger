import { useState } from "react";
import { requestFriend } from "../../data/api";

export default function RequestFriendForm({ setUser }) {
  const [friendUsername, setFriendUsername] = useState("");
  const [errors, setErrors] = useState([]);

  const handleFriendRequest = async (e) => {
    e.preventDefault();
    try {
      // Process friend request
      const user = await requestFriend(friendUsername);

      // Upon successful request, we will reset the state fields.
      setErrors([]);
      setFriendUsername("");
      setUser(user);
    } catch (error) {
      setErrors([error.response.data.message]);
    }
  };

  return (
    <form className="addNewFriend" onSubmit={(e) => handleFriendRequest(e)}>
      <label htmlFor="friendUsername">
        <p>Request Friend</p>
      </label>
      <input
        type="text"
        id="friendUsername"
        minLength="4"
        autoComplete="off"
        placeholder="Enter username"
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
