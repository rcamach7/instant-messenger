import { useState, useEffect } from "react";
import MenuBar from "../components/MenuBar";
import MessagesViewport from "../components/MessagesViewport";
import axios from "axios";

function Home(props) {
  const [mobileSwapSection, setMobileSwapSection] = useState(false);
  const [friends, setFriends] = useState([]);
  const [activeFriendChat, setActiveFriendChat] = useState({
    friendUsername: "",
    fullName: "",
    messages: [],
    _id: null,
  });
  const [roomSocket, setRoomSocket] = useState(null);

  // On component mount, retrieve the users friends and subset data.
  useEffect(() => {
    axios.get("/users/friends").then((results) => {
      setFriends(results.data.friends);
    });
  }, []);

  // Whenever we turn to our MenuBar displaying our friends, we will request another update to display the latest message.
  useEffect(() => {
    if (!mobileSwapSection) {
      axios.get("/users/friends").then((results) => {
        setFriends(results.data.friends);
      });
    }
  }, [mobileSwapSection]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.reload();
  };

  return (
    <main className="Home">
      <MenuBar
        style={{ display: mobileSwapSection ? "none" : "block" }}
        setMobileSwapSection={setMobileSwapSection}
        friends={friends}
        setActiveFriendChat={setActiveFriendChat}
        setRoomSocket={setRoomSocket}
      />
      <MessagesViewport
        style={{ display: mobileSwapSection ? "block" : "none" }}
        activeFriendChat={activeFriendChat}
        setMobileSwapSection={setMobileSwapSection}
        setActiveFriendChat={setActiveFriendChat}
        roomSocket={roomSocket}
        user={props.user}
      />

      {/* Buttons for testing purposes */}
      {/* <div
        className="testButtons"
        style={{
          position: "absolute",
          top: "5px",
          right: "5px",
        }}
      >
        <button onClick={() => handleSignOut()}>LogOut</button>
        <button onClick={() => console.log(props.user)}>User</button>
        <button onClick={() => console.log(friends)}>Friends</button>
      </div> */}
    </main>
  );
}

export default Home;
