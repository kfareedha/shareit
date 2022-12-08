import React, { useEffect, useState } from "react";
import Cover from "../../img/cover.jpg";
import Profile from "../../img/profileImg.jpg";
import { useParams } from "react-router-dom";
import "../ProfileCard/ProfileCard.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as UserApi from "../../api/UserRequest";
const PCard = ({ location }) => {
  const params = useParams();
  const { user } = useSelector((state) => state.authReducer.authData);
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const posts = useSelector((state) => state.postReducer.posts);
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;
  const ProfilePage = false;
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
      } else {
        console.log("fetching");
        const profileUser = await UserApi.getUser(profileUserId);
        console.log(profileUser, "HHHHHHHH");
        setProfileUser(profileUser);
      }
    };
    fetchProfileUser();
  }, [user]);
  return (
    <div className="ProfileCard">
      <div className="ProfileImages">
        {user._id === profileUserId ? (
          <img
            src={
              profileUser.coverPicture
                ? serverPublic + profileUser.coverPicture
                : serverPublic + "defaultCover.jpg"
            }
            alt="CoverImage"
          />
        ) : (
          <img
            src={
              profileUser?.data?.coverPicture
                ? serverPublic + profileUser?.data?.coverPicture
                : serverPublic + "defaultCover.jpg"
            }
            alt="CoverImage"
          />
        )}
        {user._id === profileUserId ? (
          <img
            src={
              profileUser.profilePicture
                ? serverPublic + profileUser.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt="ProfileImage"
          />
        ) : (
          <img
            src={
              profileUser?.data?.profilePicture
                ? serverPublic + profileUser?.data?.profilePicture
                : serverPublic + "defaultProfile.png"
            }
            alt="ProfileImage"
          />
        )}
      </div>
      <div className="ProfileName">
        <span>
          {" "}
          {user._id === profileUserId
            ? profileUser?.username
            : profileUser?.data?.username}
        </span>
        <span>
          {" "}
          {user._id === profileUserId
            ? profileUser?.worksAt
            : profileUser?.data?.worksAt}
        </span>
      </div>

      <div className="followStatus">
        <hr />
        <div>
          <div className="follow">
            <span>
              {" "}
              {user._id === profileUserId
                ? profileUser?.followers?.length
                : profileUser?.data?.followers.length}
            </span>
            <span>Followers</span>
          </div>
          <div className="vl"></div>
          <div className="follow">
            <span>
              {" "}
              {user._id === profileUserId
                ? profileUser?.following?.length
                : profileUser?.data?.following.length}
            </span>
            <span>Following</span>
          </div>
          {/* for profilepage */}
          {location === "profilePage" && (
            <>
              <div className="vl"></div>
              <div className="follow">
                <span>
                  {posts.filter((post) => post.userId === user._id).length}
                </span>
                <span>Posts</span>
              </div>{" "}
            </>
          )}
        </div>
        <hr />
      </div>

      {location === "profilePage" ? (
        ""
      ) : (
        <span>
          <Link
            to={`/profile/${user._id}`}
            style={{
              textDecoration: "none",
              textAlign: "center",
              color: "#4d7e3e",
            }}
          >
            My Profile
          </Link>
        </span>
      )}
    </div>
  );
};

export default PCard;
