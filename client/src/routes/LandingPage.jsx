import { useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import CreateAccountForm from "../components/forms/CreateAccountForm";

function LandingPage(props) {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [showCreateAccountForm, setCreateAccountForm] = useState(false);

  // Upon login - we will save the token we receive (if successful) and store it in local memory.
  // Upon page reload, our main component will detect the auth token and route the user to the home page.
  const handleLogin = (e) => {
    e.preventDefault();
    axios.post("/users/log-in", account).then((results) => {
      localStorage.setItem("token", results.data.token);
      window.location.reload();
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
