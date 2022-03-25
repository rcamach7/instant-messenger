import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

function ChatRow(props) {
  // Will sort the messages by the message dat, and grab the last message sent between the two users to populate in the preview
  // If no message history, we default to a preset value to avoid errors.
  let lastMessage =
    props.chat.messages.length > 0
      ? props.chat.messages.sort((a, b) => b.timestamp - a.timestamp)[
          props.chat.messages.length - 1
        ].message
      : "start conversation";

  const handleInitiateChat = () => {
    // Will this particular friends information to initiate a chatroom with a socket connection.
    props.setActiveFriendChat({
      friendUsername: props.chat.friend.username,
      fullName: props.chat.friend.fullName,
      messages: props.chat.messages,
    });
    props.setRoomSocket(props.chat._id);

    // Retrieve the current width of our viewport.
    const viewportWidth = Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0
    );
    // If viewport still in mobile size, we will hide one component and display another.
    if (viewportWidth <= 415) {
      props.setMobileSwapSection(true);
    }
  };

  return (
    <section className="ChatRow" onClick={() => handleInitiateChat()}>
      <span>{<FontAwesomeIcon icon={faCircle} className="userIcon" />}</span>
      <div className="contactInfo">
        <p className="friendName">{props.chat.friend.fullName}</p>
        <p className="messagePreview">{lastMessage}</p>
      </div>
    </section>
  );
}

export default ChatRow;
