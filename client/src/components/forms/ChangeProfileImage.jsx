import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChangeProfileImage({ setUser }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (image !== null) {
      // Create a formData instance so we can send multipart/form-data outside of form control
      const formData = new FormData();
      formData.append("image", image);

      axios({
        method: "put",
        url: "https://mighty-depths-39289.herokuapp.com/users/profilePicture",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      }).then(() => {
        // Refresh user data to show profile picture change.
        axios
          .get("https://mighty-depths-39289.herokuapp.com/users/")
          .then((results) => {
            setUser(results.data.user);
          });
      });
    }
  }, [image]);

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
