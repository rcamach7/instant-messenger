import { useState } from "react";
import logo from "../assets/logo.gif";
import { CreateAccountForm } from "../components/forms/";
import { getToken } from "../data/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useUserContext } from "../context/UserContext";

function LandingPage() {
  const { setJwtToken } = useUserContext();

  const [account, setAccount] = useState({
    username: "",
    password: "",
  });
  const [loadingUx, setLoadingUx] = useState(false);
  const [errors, setErrors] = useState(false);
  const [showCreateAccountForm, setCreateAccountForm] = useState(false);

  const handleLogin = async (e, useTestAccount) => {
    e.preventDefault();
    setLoadingUx(true);
    try {
      let token = await getToken(
        useTestAccount ? { username: "foobar", password: "test" } : account
      );
      setJwtToken(token);
    } catch (error) {
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
        {errors && <p className="form-errors">Invalid username or password</p>}
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
