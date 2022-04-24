import { useState, useContext } from "react";
import { UserContext } from "../../RouteSwitch";
import { updateName } from "../../assets/api";

export default function UpdateNameForm({ setShowEditNameForm }) {
  const { user, setUser } = useContext(UserContext);
  const [newName, setNewName] = useState({
    fullName: user.fullName,
  });

  const handleNameChange = async (e) => {
    e.preventDefault(e);
    try {
      const { user, token } = await updateName(newName);
      // Delete old token, and store the new one with freshly signed user details
      localStorage.removeItem("token");
      localStorage.setItem("token", token);
      // Update our parent component with new user details.
      setUser(user);
      setShowEditNameForm(false);
    } catch (err) {
      alert(`Error occurred while changing name`);
    }
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
