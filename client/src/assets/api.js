import axios from "axios";
import config from "./config.json";

// Retrieve current user info
export async function getUser() {
  try {
    const {
      data: { user },
    } = await axios.get(`${config.apiUrl}/users/`);
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
}

// Retrieve current users friends
export async function getFriends() {
  try {
  } catch (error) {
    return Promise.reject(error);
  }
}

// Add a friend to the current user
export async function addFriend(friend) {
  try {
    await axios.post(`${config.apiUrl}/users/friends`, {
      friendUsername: friend,
    });
    return Promise.resolve();
  } catch (error) {
    return Promise.reject(error);
  }
}

// Update profile image, and return user with updated image
export async function updateProfilePicture(image) {
  try {
    // Create a formData instance so we can send multipart/form-data outside of form control
    const formData = new FormData();
    formData.append("image", image);
    await axios({
      method: "put",
      url: `${config.apiUrl}/users/profilePicture`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    // Retrieve user with updated information
    const user = await getUser();
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
}
