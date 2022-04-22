import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import config from "../../assets/config.json";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ChangeProfileImageForm({ setUser }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    const updatePicture = async () => {
      // Create a formData instance so we can send multipart/form-data outside of form control
      const formData = new FormData();
      formData.append("image", image);

      try {
        await axios({
          method: "put",
          url: `${config.apiUrl}/users/profilePicture`,
          data: formData,
          headers: { "Content-Type": "multipart/form-data" },
        });
        // Retrieve new user information and update app.
        const {
          data: { user },
        } = await axios.get(`${config.apiUrl}/users/`);
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
