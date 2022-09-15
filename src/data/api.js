import axios from "axios";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_URL;

// Retrieve current user info
export async function getUser() {
  try {
    const {
      data: { user },
    } = await axios.get(`/users/`);
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
    } = await axios.post(`/users/`, {
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
    } = await axios.post(`/login`, account);
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
    } = await axios.get(`/users/friends`);
    return Promise.resolve({
      friends,
      receivedFriendRequests,
      sentFriendRequests,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

export async function requestFriend(friendUsername) {
  try {
    const {
      data: { user },
    } = await axios.put(`/friends/${friendUsername}`);

    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
}

// Add a friend to the current user
export async function acceptFriendRequest(friendId) {
  try {
    const {
      data: { user },
    } = await axios.post(`/friends/${friendId}`);

    return Promise.resolve(user);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

// Send a new message to a friend
export async function sendMessage(friendId, roomSocket, message) {
  try {
    await axios.post(`/messages/${friendId}`, {
      message,
      // _id field is passed to emit a socket signal to any users in a room with this identifier.
      _id: roomSocket,
    });
    return Promise.resolve();
  } catch (error) {
    console.log(error);
    Promise.reject(error);
  }
}

// Update profile image, and return user with updated image
export async function updateProfilePicture(profilePicture) {
  try {
    // Create a formData instance so we can send multipart/form-data outside of form control
    const formData = new FormData();
    formData.append("profilePicture", profilePicture);

    const {
      data: { user },
    } = await axios({
      method: "put",
      url: `/users/`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
    });
    return Promise.resolve(user);
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

export async function updateName(fullName) {
  try {
    const {
      data: { user },
    } = await axios.put(`/users/`, { fullName });
    return Promise.resolve(user);
  } catch (error) {
    return Promise.reject(error);
  }
}
