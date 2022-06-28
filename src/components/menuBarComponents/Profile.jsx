import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDev } from "@fortawesome/free-brands-svg-icons";
import { useState, useEffect } from "react";
import { useUserContext } from "../../context/UserContext";
import { UpdateNameForm, ChangeProfileImageForm } from "../forms/";
import LoadingComponents from "./LoadingComponents";

function Profile({ setShowProfile }) {
  const { user, setUser, setTheme } = useUserContext();
  const [loadingUI, setLoadingUI] = useState(true);
  const [showEditNameForm, setShowEditNameForm] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  useEffect(() => {
    if (user) setLoadingUI(false);
  }, [user]);

  return (
    <div className="ProfileBackdrop">
      <div className="Profile">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="iconClose"
          onClick={() => setShowProfile(false)}
        />

        {/* Shows user image along with ability to update their image */}
        <div className="profileInformation">
          <div className="profilePictureContainer">
            {user && (
              <img
                src={user.profilePicture}
                alt="profileImage"
                className="profilePicture"
              />
            )}
            <ChangeProfileImageForm setUser={setUser} />
          </div>

          {/* Shows user information such as name, username, and ability to edit them */}
          <section className="profileName">
            {showEditNameForm ? (
              <UpdateNameForm setShowEditNameForm={setShowEditNameForm} />
            ) : (
              user && <p className="userName">{user.fullName}</p>
            )}
            {/* Icon to update profile picture */}
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="editNameIcon icon"
              onClick={() => setShowEditNameForm(!showEditNameForm)}
            />
          </section>
          {user && <p>{user.username}</p>}
        </div>

        {/* Profile Page Buttons */}
        <nav className="profileButtons">
          <ul className="buttonList">
            <li>
              <button
                onClick={() =>
                  setTheme((prevState) =>
                    prevState === "light" ? "dark" : "light"
                  )
                }
              >
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

      {/* Will show loading screen incase user data is still being fetched */}
      {loadingUI && <LoadingComponents />}
    </div>
  );
}

export default Profile;
