import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { updateProfilePicture } from "../../assets/api";

export default function ChangeProfileImageForm({ setUser }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const updatePicture = async () => {
      try {
        const user = await updateProfilePicture(image);
        setUser(user);
      } catch (error) {
        alert("Error uploading new picture");
      }
    };

    // Runs whenever a image gets uploaded to the form
    if (image !== null) {
      updatePicture();
    }
  }, [image, setUser]);

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
        onChange={(e) => setImage(e.target.files[0])}
      />
    </form>
  );
}
