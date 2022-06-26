import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faDev } from "@fortawesome/free-brands-svg-icons";
import { useUserContext } from "../../../context/UserContext";
import { RequestFriendForm } from "../../forms/";
import SentFriendRequest from "./SentFriendRequest";
import FriendRequest from "./FriendRequest.jsx";

export default function AddFriends({ setShowAddFriends }) {
  const { user, setUser } = useUserContext();
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
        {sentFriendRequests.length > 0 ? (
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
        ) : null}

        {/* Container for requests received for user */}
        {receivedFriendRequests.length > 0 ? (
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
        ) : null}

        <div className="facebookPreview">
          <img
            src="https://res.cloudinary.com/de2ymful4/image/upload/v1652142742/facebook/assets/fb_hook_2_bt1r2n.png"
            alt="facebook"
          />
          <ul className="sellPoints">
            <li>
              <FontAwesomeIcon icon={faSquareCheck} /> Discover friends over at
              our{" "}
              <a href="https://rcamach7.github.io/facebook-clone/">
                Facebook Clone!
              </a>
            </li>
            <li>
              <FontAwesomeIcon icon={faSquareCheck} /> Same account information
              across both apps!
            </li>
          </ul>
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
