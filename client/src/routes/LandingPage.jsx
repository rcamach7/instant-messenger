import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import CreateAccountForm from "../components/forms/CreateAccountForm";

function LandingPage() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  // Will display error if credentials are not correct
  const [errors, setErrors] = useState(false);
  const [showCreateAccountForm, setCreateAccountForm] = useState(false);

  // Upon login - we will save the token we receive (if successful) and store it in local memory.
  // Upon page reload, our main component will detect the auth token and route the user to the home page.
  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("/users/log-in", account)
      .then((results) => {
        // Saves new token from log-in, refreshes webpage, and allows app to detect and log in user provided the saved token.
        localStorage.setItem("token", results.data.token);
        window.location.reload();
      })
      // Catch and display any login errors from API
      .catch(() => {
        setErrors(true);
      });
  };

  return (
    <div className="LandingPage">
      <aside>
        <img src={logo} alt="" />
        <p className="logo-text">
          Connect with friends and the world around you on Messenger.
        </p>
      </aside>

      <form onSubmit={(e) => handleLogin(e)}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={account.username}
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          minLength="4"
          maxLength="100"
          autoComplete="off"
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={account.password}
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          minLength="4"
          maxLength="100"
          autoComplete="off"
          required
        />
        {errors ? (
          <p style={{ color: "red" }}>Invalid username or password</p>
        ) : null}
        <button className="login-btn" type="submit">
          Log In
        </button>
        <button type="button"> Forgot password?</button>

        <button
          className="newAccount-btn"
          type="button"
          onClick={() => setCreateAccountForm(true)}
        >
          Create new account
        </button>
      </form>

      {/* Hidden form component */}
      {showCreateAccountForm ? (
        <CreateAccountForm setCreateAccountForm={setCreateAccountForm} />
      ) : null}
    </div>
  );
}

export default LandingPage;
