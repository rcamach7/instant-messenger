import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDev } from "@fortawesome/free-brands-svg-icons";
import { useState, useContext } from "react";
import { UserContext } from "../../RouteSwitch";
import UpdateNameForm from "../forms/UpdateNameForm";
import ChangeProfileImage from "../forms/ChangeProfileImage";

function Profile({ toggleTheme, setStoredJwt, setShowProfile }) {
  const { user, setUser } = useContext(UserContext);
  const [showEditNameForm, setShowEditNameForm] = useState(false);
  // Deletes token and refreshes the page to log user out.
  const handleSignOut = () => {
    localStorage.removeItem("token");
    setUser(null);
    setStoredJwt(null);
  };

  return (
    <div className="ProfileBackdrop">
      <div className="Profile">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="iconClose"
          onClick={() => setShowProfile(false)}
        />

        <div className="profileInformation">
          <div className="profilePictureContainer">
            <img
              src={user.profilePicture}
              alt="profileImage"
              className="profilePicture"
            />
            <ChangeProfileImage setUser={setUser} />
          </div>
          <section className="profileName">
            {showEditNameForm ? (
              <UpdateNameForm setShowEditNameForm={setShowEditNameForm} />
            ) : (
              <p className="userName">{user.fullName}</p>
            )}
            {/* Icon to update profile picture */}
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="editNameIcon icon"
              onClick={() => setShowEditNameForm(!showEditNameForm)}
            />
          </section>
          <p>({user.username})</p>
        </div>

        {/* Profile PAge Buttons */}
        <nav className="profileButtons">
          <ul className="buttonList">
            <li>
              <button onClick={() => toggleTheme()}>Toggle Dark Mode</button>
            </li>
            <li>
              <button>Report A Problem</button>
            </li>
            <li>
              <button onClick={() => handleSignOut()}>Log Out</button>
            </li>
          </ul>
        </nav>

        <ul className="socialsContainer">
          <li>
            <FontAwesomeIcon icon={faGithub} className="socialIcon" />
          </li>
          <li>
            <FontAwesomeIcon icon={faDev} className="socialIcon" />
          </li>
        </ul>
      </div>
    </div>
  );
}
export default Profile;
