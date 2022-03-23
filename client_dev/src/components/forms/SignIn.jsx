import axios from "axios";
import { useState } from "react";

function SignIn(props) {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/users/log-in", account).then((results) => {
      // Set user information to state and save token locally
      props.setUser(results.data.user);
      localStorage.setItem("token", results.data.token);
      // Retrieve friends
      axios.get("/users/friends").then((result) => {
        props.setFriends(result.data);

        // Remove sign in form
        props.setShowSignInForm(false);
      });
    });
  };

  return (
    <div className="formBackdrop">
      <form className="SignIn" onSubmit={(e) => handleSubmit(e)}>
        <p
          className="close-icon"
          onClick={() => props.setShowSignInForm(false)}
        >
          X
        </p>
        <p>Log In</p>
        <br />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          minLength="4"
          maxLength="100"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          minLength="4"
          maxLength="100"
          required
        />

        <input type="submit" className="btn" style={{ marginTop: "auto" }} />
      </form>
    </div>
  );
}

export default SignIn;
