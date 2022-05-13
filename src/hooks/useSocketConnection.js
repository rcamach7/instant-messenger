import io from "socket.io-client";
import config from "../assets/config.json";
import { getUser } from "../assets/api.js";
import { useEffect, useContext } from "react";
import { UserContext } from "../RouteSwitch";

// Create a live socket connection to our server to listen to events.
const socket = io.connect(`${config.apiUrl}`, {
  transports: ["websocket"],
});

export default function useSocketConnection(roomSocket, setActiveFriendChat) {
  const { setUser } = useContext(UserContext);

  const fetchUser = async () => {
    try {
      const user = await getUser();
      setUser(user);
    } catch (error) {
      console.log(error);
      alert("Error refreshing user");
    }
  };

  // If friendship ID exists for the active chat, we will join a specific room to listen for messages between this friend
  useEffect(() => {
    if (roomSocket !== null) {
      socket.emit("join", { _id: roomSocket });
    }
  }, [roomSocket]);

  // Manages socket alerts
  useEffect(() => {
    // When our message, or a message from a friends is saved on DB, it will emit a signal to both us us (if connected) to save our new message.
    socket.on("chat message", (newFriendMessage) => {
      setActiveFriendChat((prevState) => {
        return {
          ...prevState,
          messages: [...prevState.messages, newFriendMessage],
        };
      });

      fetchUser();
    });

    // When a new request is sent out - let active users know and reflect change if appropriate.
    socket.on("friend activity", () => {
      fetchUser();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
