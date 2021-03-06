import { useState } from "react";
import { useUserContext } from "../../context/UserContext";
import { updateName } from "../../data/api";

export default function UpdateNameForm({ setShowEditNameForm }) {
  const { user, setUser } = useUserContext();
  const [fullName, setFullName] = useState(user ? user.fullName : "");

  const handleNameChange = async (e) => {
    e.preventDefault(e);
    try {
      const user = await updateName(fullName);
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
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        autoComplete="false"
        minLength="4"
        required
      />
      <input id="submitBtn" type="submit" />
    </form>
  );
}
