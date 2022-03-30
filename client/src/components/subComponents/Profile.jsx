import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircle,
  faMoon,
  faXmark,
  faHeartCrack,
  faPenToSquare,
  faImage,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDev } from "@fortawesome/free-brands-svg-icons";
import { useEffect, useState } from "react";
import UpdateNameForm from "../forms/UpdateNameForm";
import axios from "axios";

function Profile(props) {
  const [showEditNameForm, setShowEditNameForm] = useState(false);
  // Deletes token and refreshes the page to log user out.
  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <div className="ProfileBackdrop">
      <div className="Profile">
        <ul className="topBar">
          <li onClick={() => props.setShowProfile(false)}>
            <FontAwesomeIcon icon={faCircleXmark} className="iconClose" />
          </li>
        </ul>

        <div className="profileInformation">
          <div className="profileImage">
            <FontAwesomeIcon icon={faCircle} style={{ fontSize: "150px" }} />
            <ChangeProfileImage />
          </div>
          {/* <p>{props.user.fullName}</p> */}
          <section className="profileName">
            {showEditNameForm ? (
              <UpdateNameForm
                user={props.user}
                setUser={props.setUser}
                setShowEditNameForm={setShowEditNameForm}
              />
            ) : (
              <p>{props.user.fullName}</p>
            )}
            <FontAwesomeIcon
              icon={faPenToSquare}
              className="editNameIcon"
              onClick={() => setShowEditNameForm(!showEditNameForm)}
            />
          </section>
          <p>({props.user.username})</p>
        </div>

        <nav className="profileButtons">
          <ul className="buttonList">
            <li>
              <FontAwesomeIcon className="buttonIcon" icon={faMoon} />
              <button>Toggle Dark Mode</button>
            </li>
            <li>
              <FontAwesomeIcon className="buttonIcon" icon={faHeartCrack} />
              <button>Report A Problem</button>
            </li>
            <li>
              <FontAwesomeIcon className="buttonIcon" icon={faXmark} />
              <button onClick={handleSignOut}>Log Out</button>
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

function ChangeProfileImage() {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image !== null) {
      const formData = new FormData();
      formData.append("image", image);

      axios({
        method: "put",
        url: "/users/profilePicture",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then((result) => {
        console.log(result);
      });
    }
  }, [image]);

  return (
    <form className="ChangeProfileImage">
      <label htmlFor="fileUpload" className="fileUploadLabel">
        <FontAwesomeIcon icon={faImage} />
      </label>
      <input
        className="fileUpload"
        id="fileUpload"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setImage(e.target.files[0])}
      />
    </form>
  );
}

export default Profile;
