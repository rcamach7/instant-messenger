function ChatRow({
  activeStyle,
  chat,
  setMobileSwapSection,
  setActiveFriendChat,
  setRoomSocket,
}) {
  // Will sort the messages by the message dat, and grab the last message sent between the two users to populate in the preview
  // If no message history, we default to a preset value to avoid errors.
  let lastMessage =
    chat.messages.length > 0
      ? chat.messages.sort((a, b) => b.timestamp - a.timestamp)[
          chat.messages.length - 1
        ].message
      : "start conversation";

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
