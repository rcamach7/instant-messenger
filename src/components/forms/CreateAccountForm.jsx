import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { createUser } from "../../data/api";

function CreateAccountForm({ setCreateAccountForm }) {
  const [account, setAccount] = useState({
    fullName: "",
    username: "",
    password: "",
    passwordConfirm: "",
  });
  const [badPasswordError, setBadPasswordError] = useState(false);
  // Will show any API errors after submission.
  const [badRequest, setBadRequest] = useState([]);

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    if (account.password !== account.passwordConfirm) {
      setBadPasswordError(true);
    } else {
      try {
        const token = await createUser(account);
        // Save token to local storage and refresh page.
        localStorage.setItem("token", token);
        window.location.reload();
      } catch (error) {
        setBadRequest(error.response.data.errors);
      }
    }
  };

  // Update state by pulling the ID and value of the input being changes and updating our state.
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setAccount({
      ...account,
      [id]: value,
    });
  };

  return (
    <div className="formBackdrop">
      <form
        action=""
        className="CreateAccountForm"
        onSubmit={(e) => handleCreateAccount(e)}
      >
        <p className="close-icon" onClick={() => setCreateAccountForm(false)}>
          {<FontAwesomeIcon icon={faClose} />}
        </p>
        <p>Create Account</p>
        <input
          type="text"
          id="fullName"
          onChange={handleInputChange}
          placeholder="Full name"
          minLength="4"
          maxLength="100"
          required
        />

        <input
          type="text"
          id="username"
          onChange={handleInputChange}
          placeholder="Username"
          minLength="4"
          maxLength="100"
          required
        />

        <input
          type="password"
          id="password"
          onChange={handleInputChange}
          placeholder="Password"
          minLength="4"
          maxLength="100"
          required
        />
        <input
          type="password"
          id="passwordConfirm"
          onChange={handleInputChange}
          placeholder="Confirm password"
          minLength="4"
          maxLength="100"
          required
        />
        {/* If passwords don't match on submission - ask user to fill again */}
        {badPasswordError && (
          <p className="submissionError ">Passwords do not match</p>
        )}
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
