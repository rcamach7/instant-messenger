import { useState, useEffect } from "react";
import { sortFriends } from "../assets/helperFunctions";
import MenuBar from "../components/MenuBar";
import MessagesViewport from "../components/MessagesViewport";
import { getFriends } from "../assets/api";

function Home({ toggleTheme, setStoredJwt }) {
  const [mobileSwapSection, setMobileSwapSection] = useState(false);
  const [myFriends, setMyFriends] = useState({
    friends: [],
    receivedFriendRequests: [],
    sentFriendRequests: [],
  });
  // Active chat information
  const [roomSocket, setRoomSocket] = useState(null);
  const [activeFriendChat, setActiveFriendChat] = useState({
    friendUsername: "",
    fullName: "",
    messages: [],
  });

  // Whenever we turn to our MenuBar displaying our friends, we will request another update to display the latest message.
  // Only while on mobile view since we swap display of components.
  useEffect(() => {
    if (!mobileSwapSection) {
      refreshFriendsInformation();
    }
  }, [mobileSwapSection]);

  // Get user specific friend info. Called on mount and when user receives a request or sends one out - to have UI reflect any changes visually.
  const refreshFriendsInformation = async () => {
    try {
      // De-construct specific fields we will receive when we get our response.
      const { friends, receivedFriendRequests, sentFriendRequests } =
        await getFriends();
      // Set all appropriate response fields to state variable
      setMyFriends({
        friends: sortFriends(friends),
        receivedFriendRequests,
        sentFriendRequests,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="Home">
      <MenuBar
        style={{ display: mobileSwapSection ? "none" : "flex" }}
        activeFriendChat={activeFriendChat}
        myFriends={myFriends}
        toggleTheme={toggleTheme}
        refreshFriendsInformation={refreshFriendsInformation}
        setStoredJwt={setStoredJwt}
        setMobileSwapSection={setMobileSwapSection}
        setActiveFriendChat={setActiveFriendChat}
        setRoomSocket={setRoomSocket}
      />
      <MessagesViewport
        style={{ display: mobileSwapSection ? "block" : "none" }}
        activeFriendChat={activeFriendChat}
        roomSocket={roomSocket}
        toggleTheme={toggleTheme}
        refreshFriendsInformation={refreshFriendsInformation}
        setMobileSwapSection={setMobileSwapSection}
        setActiveFriendChat={setActiveFriendChat}
      />
    </main>
  );
}

export default Home;
