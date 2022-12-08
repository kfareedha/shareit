import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { followUser, unfollowUser } from "../../actions/UserActions";
import Comment from "../../img/comment.png";
import { useNavigate } from "react-router-dom";
import { createChat } from "../../api/ChatRequest";
import { Link } from "react-router-dom";
const User = ({ person }) => {
  const publicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user } = useSelector((state) => state.authReducer.authData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [following, setFollowing] = useState(
    person.followers.includes(user._id)
  );
  const handleFollow = () => {
    following
      ? dispatch(unfollowUser(person._id, user))
      : dispatch(followUser(person._id, user));
    setFollowing((prev) => !prev);
  };
  const addToChat = () => {
    const chatData = {
      senderId: user._id,
      recieverId: person._id,
    };
    console.log(chatData, "uuuuuu");
    createChat(chatData);
    navigate("/chat");
  };
  return (
    <div className="follower">
      <div>
        <img
          src={
            person.profilePicture
              ? publicFolder + person.profilePicture
              : publicFolder + "defaultProfile.png"
          }
          alt="profile"
          className="followerImage"
        />
        <Link
          to={`/profile/${person._id}`}
          style={{
            textDecoration: "none",
            textAlign: "center",
            color: "#4d7e3e",
          }}
        >
          <div className="name">
            <span>{person.username}</span>
            <span>@{person.username}</span>
          </div>
        </Link>
      </div>

      <img
        style={{ height: "15px", width: "15px", cursor: "pointer" }}
        onClick={addToChat}
        src={Comment}
        alt=""
      />

      <button
        className={
          following ? "button fc-button UnfollowButton" : "button fc-button"
        }
        onClick={handleFollow}
      >
        {following ? "Unfollow" : "Follow"}
      </button>
    </div>
  );
};

export default User;
