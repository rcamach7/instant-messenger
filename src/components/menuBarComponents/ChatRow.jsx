import { getLastMessage } from "../../data/helperFunctions";
import { useUserContext } from "../../context/UserContext";

function ChatRow({ activeStyle, chat, setMobileSwapSection }) {
  const { setRoomSocket, setActiveFriendChat } = useUserContext();
  let lastMessage = getLastMessage(chat.messages);

  const handleInitiateChat = () => {
    // Will store this particular friends information to initiate a chatroom with a socket connection.
    setActiveFriendChat({
      friendId: chat.friend._id,
      fullName: chat.friend.fullName,
      messages: chat.messages,
    });
    setRoomSocket(chat._id);

    // Retrieve the current width of our viewport.
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    // If viewport still in mobile size, we will hide one component and display another.
    if (viewportWidth <= 415) {
      setMobileSwapSection(true);
    }
  };

  return (
    <section
      className={`ChatRow ${activeStyle}`}
      onClick={() => handleInitiateChat()}
    >
      <img
        src={chat.friend.profilePicture}
        alt="userImage"
        className="userImage"
      />
      <div className="contactInfo">
        <p className="friendName">{chat.friend.fullName}</p>
        <p className="messagePreview">{lastMessage}</p>
      </div>
    </section>
  );
}

export default ChatRow;
