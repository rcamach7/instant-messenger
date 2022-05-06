import { acceptFriendRequest } from "../../../assets/api";

export default function FriendRequest({ receivedRequest, setUser }) {
  // Accept friend request and have API add user to friends.
  const handleAcceptRequest = async (friendId) => {
    try {
      const user = await acceptFriendRequest(friendId);
      setUser(user);
    } catch (error) {
      alert("Error adding friend");
    }
  };

  return (
    <div className="FriendRequest">
      <img
        className="userPicture"
        src={receivedRequest._id.profilePicture}
        alt=""
      />

      <div className="userInfo">
        <p>{receivedRequest._id.fullName}</p>
        <div className="actionButtons">
          <button
            className="confirm"
            onClick={() => handleAcceptRequest(receivedRequest._id._id)}
          >
            Accept
          </button>
          <button>Deny</button>
        </div>
      </div>
    </div>
  );
}
