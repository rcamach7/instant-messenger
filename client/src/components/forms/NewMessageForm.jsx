import { useState } from "react";
import axios from "axios";
import config from "../../assets/config.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImages,
  faFaceSmile,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";

function NewMessageForm({ activeFriendChat, roomSocket }) {
  const [newMessage, setNewMessage] = useState("");

  const handleNewMessage = async (e) => {
    e.preventDefault();
    // If user isn't inside a friend chat, let user know. (happens upon first log in)
    if (activeFriendChat.friendUsername === "") {
      alert("Please select a friend to begin a conversation");
      setNewMessage("");
    } else {
      try {
        await axios.post(`${config.apiUrl}/users/friends/messages`, {
          friendUsername: activeFriendChat.friendUsername,
          message: newMessage,
          // _id field is passed to emit a socket signal to any users in a room with this identifier.
          _id: roomSocket,
        });
        setNewMessage("");
      } catch (error) {
        alert("Error sending new message");
      }
    }
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
