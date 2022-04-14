import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDev } from "@fortawesome/free-brands-svg-icons";
import { useState } from "react";
import UpdateNameForm from "../forms/UpdateNameForm";
import ChangeProfileImage from "../forms/ChangeProfileImage";

function Profile(props) {
  const [showEditNameForm, setShowEditNameForm] = useState(false);
  // Deletes token and refreshes the page to log user out.
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload(false);
  };

  return (
    <div className="ProfileBackdrop">
      <div className="Profile">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="iconClose"
          onClick={() => props.setShowProfile(false)}
        />

        <div className="profileInformation">
          <div className="profilePictureContainer">
            <img
              src={props.user.profilePicture}
              alt="profileImage"
              className="profilePicture"
            />
            <ChangeProfileImage setUser={props.setUser} />
          </div>
          <section className="profileName">
            {showEditNameForm ? (
              <UpdateNameForm
                user={props.user}
                setUser={props.setUser}
                setShowEditNameForm={setShowEditNameForm}
              />
            ) : (
              <p className="userName">{props.user.fullName}</p>
            )}
            {/* Icon to update profile picture */}
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="editNameIcon icon"
              onClick={() => setShowEditNameForm(!showEditNameForm)}
            />
          </section>
          <p>({props.user.username})</p>
        </div>

        {/* Profile PAge Buttons */}
        <nav className="profileButtons">
          <ul className="buttonList">
            <li>
              <button onClick={() => props.toggleTheme()}>
                Toggle Dark Mode
              </button>
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
