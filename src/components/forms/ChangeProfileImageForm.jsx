import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { updateProfilePicture } from "../../data/api";

export default function ChangeProfileImageForm({ setUser }) {
  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const updatePicture = async () => {
      try {
        const user = await updateProfilePicture(profilePicture);
        setUser(user);
      } catch (error) {
        alert("Error uploading new picture");
      }
    };

    // Runs whenever a profilePicture gets uploaded to the form
    if (profilePicture !== null) {
      updatePicture();
    }
  }, [profilePicture, setUser]);

  return (
    <form className="ChangeProfileImage">
      <label htmlFor="fileUpload" className="cameraIconLabel">
        <FontAwesomeIcon icon={faCamera} className="fileUploadIcon" />
      </label>
      <input
        className="fileUpload"
        id="fileUpload"
        type="file"
        accept=".jpg, .jpeg, .png"
        onChange={(e) => setProfilePicture(e.target.files[0])}
      />
    </form>
  );
}
