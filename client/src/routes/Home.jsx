import { useState, useEffect } from "react";
import MenuBar from "../components/MenuBar";
import MessagesViewport from "../components/MessagesViewport";
import axios from "axios";

function Home(props) {
  // User friend information
  const [friends, setFriends] = useState([]);
  const [receivedFriendRequests, setReceivedFriendRequests] = useState([]);
  const [sentFriendRequests, setSentFriendRequests] = useState([]);

  // App functions
  const [mobileSwapSection, setMobileSwapSection] = useState(false);
  const [activeFriendChat, setActiveFriendChat] = useState({
    friendUsername: "",
    fullName: "",
    messages: [],
  });
  const [roomSocket, setRoomSocket] = useState(null);

  // On component mount, retrieve the users friends and subset data.
  useEffect(() => {
    axios.get("/users/friends").then((results) => {
      // Set all user friend info
      setFriends(results.data.friends);
      setReceivedFriendRequests(results.data.receivedFriendRequests);
      setSentFriendRequests(results.data.sentFriendRequests);
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

  // Whenever user changes friend information (accept friend request - or send a friend request) we need to reflect that change real-time
  // by fetching from the DB again.
  const refreshFriendsInformation = () => {
    axios.get("/users/friends").then((results) => {
      setFriends(results.data.friends);
      setReceivedFriendRequests(results.data.receivedFriendRequests);
      setSentFriendRequests(results.data.sentFriendRequests);
    });
  };

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
        receivedFriendRequests={receivedFriendRequests}
        sentFriendRequests={sentFriendRequests}
        refreshFriendsInformation={refreshFriendsInformation}
      />
      <MessagesViewport
        style={{ display: mobileSwapSection ? "block" : "none" }}
        user={props.user}
        activeFriendChat={activeFriendChat}
        setMobileSwapSection={setMobileSwapSection}
        setActiveFriendChat={setActiveFriendChat}
        roomSocket={roomSocket}
        refreshFriendsInformation={refreshFriendsInformation}
      />
    </main>
  );
}

export default Home;
