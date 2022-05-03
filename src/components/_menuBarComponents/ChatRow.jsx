import { getLastMessage } from "../../assets/helperFunctions";

function ChatRow({
  activeStyle,
  chat,
  setMobileSwapSection,
  setActiveFriendChat,
  setRoomSocket,
}) {
  let lastMessage = getLastMessage(chat.messages);

  const handleInitiateChat = () => {
    // Will this particular friends information to initiate a chatroom with a socket connection.
    setActiveFriendChat({
      friendUsername: chat.friend.username,
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
      // If this friend is the current active friend - we will apply some styling to distinguish active chat
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
