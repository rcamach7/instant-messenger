import { useState } from "react";
import logo from "../assets/fbLoginLogo.svg";
import CreateAccountForm from "../components/forms/CreateAccountForm";

function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateAccountForm, setCreateAccountForm] = useState(false);

  return (
    <div className="LandingPage">
      <aside>
        <img src={logo} alt="" />
        <p>Connect with friends and the world around you on Messenger.</p>
      </aside>

      <form>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
