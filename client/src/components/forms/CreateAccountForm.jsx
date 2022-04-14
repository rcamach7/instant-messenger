import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function CreateAccountForm(props) {
  const [account, setAccount] = useState({
    fullName: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [badPasswordError, setBadPasswordError] = useState(false);
  // Will show any API errors after submission.
  const [badRequest, setBadRequest] = useState([]);

  // Store token, and refresh page.
  const handleCreateAccount = (e) => {
    e.preventDefault(e);
    // Check if re-typed passwords match.
    if (account.password !== account.passwordConfirm) {
      // Display form error
      setBadPasswordError(true);
    } else {
      // Only send one password field, so we destructure account object, as we have confirmed passwords match.
      axios
        .post("https://mighty-depths-39289.herokuapp.com/users/", {
          fullName: account.fullName,
          username: account.username.toLowerCase(),
          password: account.password,
        })
        .then((results) => {
          localStorage.setItem("token", results.data.token);
          props.setStoredJwt(results.data.token);
          props.setUser(results.data.user);
        })
        .catch((errors) => {
          setBadRequest(errors.response.data.errors);
        });
    }
  };

  return (
    <div className="formBackdrop">
      <form
        action=""
        className="CreateAccountForm"
        onSubmit={(e) => handleCreateAccount(e)}
      >
        <p
          className="close-icon"
          onClick={() => props.setCreateAccountForm(false)}
        >
          {<FontAwesomeIcon icon={faClose} />}
        </p>
        <p>Create Account</p>
        <input
          type="text"
          id="fullName"
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          placeholder="Full name"
          minLength="4"
          maxLength="100"
          required
        />

        <input
          type="text"
          id="username"
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          placeholder="Username"
          minLength="4"
          maxLength="100"
          required
        />

        <input
          type="password"
          id="password"
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          placeholder="Password"
          minLength="4"
          maxLength="100"
          required
        />
        <input
          type="password"
          id="passwordConfirm"
          onChange={(e) =>
            setAccount({ ...account, [e.target.id]: e.target.value })
          }
          placeholder="Confirm password"
          minLength="4"
          maxLength="100"
          required
        />
        {/* If passwords don't match on submission - ask user to fill again */}
        {badPasswordError ? (
          <p className="submissionError ">Passwords do not match</p>
        ) : null}
        {/* Prints any errors generated from API */}
        {badRequest.map((submissionError, i) => {
          return (
            <p key={i} className="submissionError">
              {submissionError.msg}
            </p>
          );
        })}
        <input type="submit" className="btn" />
      </form>
    </div>
  );
}

export default CreateAccountForm;
