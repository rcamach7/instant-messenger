import io from "socket.io-client";
import { useEffect } from "react";

// Create a live socket connection to our server to listen to events.
const socket = io.connect("https://mighty-depths-39289.herokuapp.com/", {
  transports: ["websocket"],
});

export default function useSocketConnection(
  roomSocket,
  activeFriendChat,
  refreshFriendsInformation,
  setActiveFriendChat
) {
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
      setActiveFriendChat({
        ...activeFriendChat,
        messages: [...activeFriendChat.messages, newFriendMessage],
      });
      refreshFriendsInformation();
    });

    // When a new request is sent out - let active users know and reflect change if appropriate.
    socket.on("new friend request", () => {
      refreshFriendsInformation();
    });

    // When a friend request is accepted- let active users know and reflect change if appropriate.
    socket.on("new friend acceptance", () => {
      refreshFriendsInformation();
    });
  }, [activeFriendChat]);
}
