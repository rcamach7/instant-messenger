import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDev } from "@fortawesome/free-brands-svg-icons";
import { useContext } from "react";
import { UserContext } from "../../../RouteSwitch.js";
import RequestFriendForm from "../../forms/RequestFriendForm";
import SentFriendRequest from "./SentFriendRequest";
import FriendRequest from "./FriendRequest.jsx";

export default function AddFriends({ setShowAddFriends }) {
  const { user, setUser } = useContext(UserContext);
  const { sentFriendRequests, receivedFriendRequests } = user;
  return (
    <div className="AddFriendsBackdrop">
      <div className="AddFriends">
        <FontAwesomeIcon
          onClick={() => setShowAddFriends(false)}
          icon={faCircleXmark}
          className="iconClose"
        />
        {/* Input form to request a new friend */}
        <RequestFriendForm setUser={setUser} />

        {/* Container for requests sent out by user */}
        <div className="sentRequests">
          {sentFriendRequests.length > 0 ? (
            <p className="title">Pending Requests</p>
          ) : (
            <p className="titleEmpty">No Pending Requests</p>
          )}
          {sentFriendRequests.map((sentRequest, i) => {
            return <SentFriendRequest key={i} sentRequest={sentRequest} />;
          })}
        </div>

        {/* Container for requests received for user */}
        <div className="receivedRequests">
          {receivedFriendRequests.length > 0 ? (
            <p className="title">Requests Received</p>
          ) : (
            <p className="titleEmpty">No Requests Received</p>
          )}
          {receivedFriendRequests.map((receivedRequest, i) => {
            return (
              <FriendRequest
                key={i}
                receivedRequest={receivedRequest}
                setUser={setUser}
              />
            );
          })}
        </div>

        {/* Socials Container */}
        <ul className="socialsContainer">
          <li>
            <FontAwesomeIcon icon={faGithub} className="socialIcon" />
          </li>
          <li>
            <FontAwesomeIcon icon={faDev} className="socialIcon" />
          </li>
        </ul>
      </div>
    </div>
  );
}
