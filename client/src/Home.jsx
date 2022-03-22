import "./scss/Home.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import SignIn from "./components/forms/SignIn";
import MessagesContainer from "./components/MessagesContainer";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Connect to our server
const socket = io.connect("http://localhost:2000", {
  transports: ["websocket"],
});

function Home() {
  const storedJwt = localStorage.getItem("token");
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  // State on current messages we are viewing
  const [messagesView, setMessagesView] = useState([]);
  const [friend, setFriend] = useState("");
  const [roomID, setRoomID] = useState(null);

  const [showSignInForm, setShowSignInForm] = useState(false);

  // Find a way to keep user logged in if a token exists
  useEffect(() => {
    if (storedJwt) {
      axios.get("/users/").then((results) => {
        setUser(results.data.authData);
      });
      axios.get("/users/friends").then((result) => {
        setFriends(result.data);
      });
    }
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  const loadFriendMessages = (friend_id, friendUsername) => {
    friends.forEach((friend) => {
      // Find the friend, and pull the messages from the list.
      if (friend.friend._id === friend_id) {
        setMessagesView(friend.messages);
        setFriend(friendUsername);
        setRoomID(friend._id);
      }
    });
  };

  return (
    <div className="Home">
      <header>
        <h1>Messenger</h1>
      </header>
      <main>
        <aside className="sideBar">
          <p style={{ textAlign: "center" }}>Dashboard</p>

          {user ? null : (
            <button onClick={() => setShowSignInForm(true)}>Sign In</button>
          )}
          {user ? (
            <button onClick={() => handleSignOut()}>Sign Out</button>
          ) : null}

          {/* Testing */}
          {user ? (
            <button onClick={() => console.log(user)}>Print User</button>
          ) : null}
          {user ? (
            <button onClick={() => console.log(friends)}>Print Friends</button>
          ) : null}
          {user ? (
            <button onClick={() => console.log(messagesView)}>
              Print Messages
            </button>
          ) : null}
          {user ? (
            <button onClick={() => console.log(roomID)}>Print RoomID</button>
          ) : null}

          <p style={{ textAlign: "center" }}>Friends</p>
          {friends.map((item, i) => {
            return (
              <button
                key={i}
                onClick={() =>
                  loadFriendMessages(item.friend._id, item.friend.username)
                }
              >
                {item.friend.username}
              </button>
            );
          })}
        </aside>

        <aside className="mainContent">
          <div>{user ? <h1>Hello {user.username}</h1> : null}</div>
          <div className="messageContainer">
            <MessagesContainer
              setMessagesView={setMessagesView}
              messagesView={messagesView}
              friend={friend}
              user={user ? user : null}
              socket={socket}
              roomID={roomID}
            />
          </div>
        </aside>
      </main>
      {/* Form Components */}
      {showSignInForm ? (
        <SignIn
          setShowSignInForm={setShowSignInForm}
          setUser={setUser}
          setFriends={setFriends}
        />
      ) : null}
    </div>
  );
}

export default Home;
