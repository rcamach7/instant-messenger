import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";

function CreateAccountForm(props) {
  const [account, setAccount] = useState({
    fullName: "",
    username: "",
    password: "",
  });

  return (
    <div className="formBackdrop">
      <form action="" className="CreateAccountForm">
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

        <input type="submit" className="btn" />
      </form>
    </div>
  );
}

export default CreateAccountForm;
