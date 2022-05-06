export default function SentFriendRequest({ sentRequest }) {
  return (
    <div className="SentFriendRequest">
      <img
        className="userPicture"
        src={sentRequest._id.profilePicture}
        alt=""
      />
      <p>{sentRequest._id.fullName}</p>
    </div>
  );
}
