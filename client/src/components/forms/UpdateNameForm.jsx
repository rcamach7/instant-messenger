import { useState, useContext } from "react";
import { UserContext } from "../../RouteSwitch";
import axios from "axios";

export default function UpdateNameForm({ setShowEditNameForm }) {
  const { user, setUser } = useContext(UserContext);
  const [newName, setNewName] = useState({
    fullName: user.fullName,
  });

  const handleNameChange = (e) => {
    e.preventDefault(e);
    axios
      .put("https://mighty-depths-39289.herokuapp.com/users/", newName)
      .then((results) => {
        // Delete old token, and store the new one with freshly signed user details
        localStorage.removeItem("token");
        localStorage.setItem("token", results.data.token);
        // Update our parent component with new user details.
        setUser(results.data.user);
        // Hide edit name for
        setShowEditNameForm(false);
      });
  };

  return (
    <form className="updateName" onSubmit={(e) => handleNameChange(e)}>
      <input
        type="text"
        value={newName.fullName}
        id="fullName"
        onChange={(e) =>
          setNewName({
            [e.target.id]: e.target.value,
          })
        }
        autoComplete="false"
        minLength="4"
        required
      />
      <input id="submitBtn" type="submit" />
    </form>
  );
}
