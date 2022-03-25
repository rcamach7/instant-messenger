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

  return (
    <main className="Home">
      <MenuBar
        style={{ display: mobileSwapSection ? "none" : "block" }}
        user={props.user}
        setMobileSwapSection={setMobileSwapSection}
        friends={friends}
        setActiveFriendChat={setActiveFriendChat}
        setRoomSocket={setRoomSocket}
        setUser={props.setUser}
      />
      <MessagesViewport
        style={{ display: mobileSwapSection ? "block" : "none" }}
        user={props.user}
        activeFriendChat={activeFriendChat}
        setMobileSwapSection={setMobileSwapSection}
        setActiveFriendChat={setActiveFriendChat}
        roomSocket={roomSocket}
      />
    </main>
  );
}

export default Home;
