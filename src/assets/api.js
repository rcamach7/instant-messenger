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

// Create a new account
export async function createUser(account) {
  try {
    const {
      data: { token },
    } = await axios.post(`${config.apiUrl}/users/`, {
      fullName: account.fullName,
      username: account.username.toLowerCase(),
      password: account.password,
    });
    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function getToken(account) {
  try {
    const {
      data: { token },
    } = await axios.post(`${config.apiUrl}/login`, account);
    return Promise.resolve(token);
  } catch (error) {
    return Promise.reject(error);
  }
}

// Retrieve current users friends
export async function getFriends() {
  try {
    const {
      data: { friends, receivedFriendRequests, sentFriendRequests },
    } = await axios.get(`${config.apiUrl}/users/friends`);
    return Promise.resolve({
      friends,
      receivedFriendRequests,
      sentFriendRequests,
    });
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

// Request a new friend
export async function requestFriend(friendUsername) {
  try {
    await axios.post(`${config.apiUrl}/users/friends/request`, {
      friendUsername: friendUsername.toLowerCase(),
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

// Send a new message to a friend
export async function sendMessage(friendUsername, message, roomSocket) {
  try {
    await axios.post(`${config.apiUrl}/users/friends/messages`, {
      friendUsername,
      message,
      // _id field is passed to emit a socket signal to any users in a room with this identifier.
      _id: roomSocket,
    });
    return Promise.resolve();
  } catch (error) {
    Promise.reject(error);
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

export async function updateName(newName) {
  try {
    const {
      data: { user, token },
    } = await axios.put(`${config.apiUrl}/users/`, newName);
    return Promise.resolve({ user, token });
  } catch (error) {
    return Promise.reject(error);
  }
}
