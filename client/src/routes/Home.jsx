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

  // Whenever we turn to our MenuBar displaying our friends, we will request another update to display the latest message.
  // Only while on mobile view since we swap display of components.
  useEffect(() => {
    if (!mobileSwapSection) {
      refreshFriendsInformation();
    }
  }, [mobileSwapSection]);

  // Get user specific friend info. Called on mount and when user receives a request or sends one out - to have UI reflect any changes visually.
  const refreshFriendsInformation = async (newFriendMessage) => {
    try {
      // De-construct specific fields we will receive when we get our response.
      const {
        data: { friends, receivedFriendRequests, sentFriendRequests },
      } = await axios.get(
        "https://mighty-depths-39289.herokuapp.com/users/friends"
      );
      // Set all appropriate response fields to state variables
      setFriends(friends);
      setReceivedFriendRequests(receivedFriendRequests);
      setSentFriendRequests(sentFriendRequests);
    } catch (error) {
      console.log(error);
    }
  };

  // On component mount, retrieve the users friends and set state variables.
  useEffect(() => {
    refreshFriendsInformation();
  }, []);

  return (
    <main className="Home">
      <MenuBar
        setStoredJwt={props.setStoredJwt}
        style={{ display: mobileSwapSection ? "none" : "flex" }}
        user={props.user}
        setMobileSwapSection={setMobileSwapSection}
        friends={friends}
        setActiveFriendChat={setActiveFriendChat}
        setRoomSocket={setRoomSocket}
        setUser={props.setUser}
        receivedFriendRequests={receivedFriendRequests}
        sentFriendRequests={sentFriendRequests}
        refreshFriendsInformation={refreshFriendsInformation}
        toggleTheme={props.toggleTheme}
      />
      <MessagesViewport
        style={{ display: mobileSwapSection ? "block" : "none" }}
        user={props.user}
        activeFriendChat={activeFriendChat}
        setMobileSwapSection={setMobileSwapSection}
        setActiveFriendChat={setActiveFriendChat}
        roomSocket={roomSocket}
        refreshFriendsInformation={refreshFriendsInformation}
        friends={friends}
        toggleTheme={props.toggleTheme}
      />
    </main>
  );
}

export default Home;
