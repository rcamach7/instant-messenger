import { useState } from "react";
import logo from "../assets/logo.gif";
import CreateAccountForm from "../components/forms/CreateAccountForm";
import { getToken } from "../assets/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

function LandingPage() {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [loadingUx, setLoadingUx] = useState(false);
  // Will display error if credentials are not correct
  const [errors, setErrors] = useState(false);
  const [showCreateAccountForm, setCreateAccountForm] = useState(false);

  // Upon login - we will save the token we receive (if successful) and store it in local memory.
  // Upon page reload, our main component will detect the auth token and route the user to the home page.
  const handleLogin = async (e, useTestAccount) => {
    e.preventDefault();
    try {
      // Checks if we are using a test account or not.
      let token;
      setLoadingUx(true);
      if (useTestAccount) {
        token = await getToken({ username: "foobar", password: "test" });
      } else {
        token = await getToken(account);
      }
      // Saves new token from log-in, refreshes webpage, and allows app to detect and log in user provided the saved token.
      localStorage.setItem("token", token);
      window.location.reload();
    } catch (error) {
      // Catch and display any login errors from API
      setLoadingUx(false);
      setErrors(true);
    }
  };

  return (
    <div className="LandingPage">
      <aside>
        <img src={logo} alt="" />
        <p className="logo-text">
          Connect with friends and the world around you!
        </p>
      </aside>

      <form onSubmit={(e) => handleLogin(e, false)}>
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
          <p className="form-errors">Invalid username or password</p>
        ) : null}
        <button className="login-btn" type="submit">
          Log In
        </button>
        <button type="button" onClick={(e) => handleLogin(e, true)}>
          Use Test Account
        </button>

        <button
          className="newAccount-btn"
          type="button"
          onClick={() => setCreateAccountForm(true)}
        >
          Create new account
        </button>

        {/* UX Loading spinner */}
        {loadingUx ? (
          <div className="loadingUx">
            <FontAwesomeIcon icon={faSpinner} className="loadingIcon" />
          </div>
        ) : null}
      </form>

      {/* Hidden form component */}
      {showCreateAccountForm ? (
        <CreateAccountForm setCreateAccountForm={setCreateAccountForm} />
      ) : null}
    </div>
  );
}

export default LandingPage;
