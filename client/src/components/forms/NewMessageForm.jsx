import { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faImages,
  faFaceSmile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

function NewMessageForm(props) {
  const [newMessage, setNewMessage] = useState("");

  // Create a new message after form submission.
  const handleNewMessage = (e) => {
    e.preventDefault();
    axios
      .post("/users/friends/messages", {
        friendUsername: props.activeFriendChat.friendUsername,
        message: newMessage,
        // _id field is passed to emit a socket signal to any users in a room with this identifier.
        _id: props.roomSocket,
      })
      .then(() => {
        setNewMessage("");
      });
  };

  return (
    <form className="NewMessageForm" onSubmit={(e) => handleNewMessage(e)}>
      <div className="messageOptions">
        <FontAwesomeIcon icon={faFaceSmile} className="emojiIcon" />
        <FontAwesomeIcon icon={faImages} className="imagesIcon" />
      </div>
      <input
        id="message"
        className="textBox"
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Send message"
        autoComplete="off"
        minLength="2"
        required
      />
      <button className="submitBtn" id="submit-btn" type="submit">
        <FontAwesomeIcon icon={faPaperPlane} className="icon" />
      </button>
    </form>
  );
}

export default NewMessageForm;
