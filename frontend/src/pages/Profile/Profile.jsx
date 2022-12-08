import React from "react";

import Posts from "../../components/Posts/Posts";

import Pcard from "../../components/Pcard/Pcard";
import ProfileLeft from "../../components/ProfileLeft/ProfileLeft";
import Respnav from "../../components/Respnav/Respnav";
import RightSide from "../../components/RightSide/RightSide";
import "./Profile.css";
import "./Profile.css";
const Profile = () => {
  return (
    <div className="Profile ">
      <ProfileLeft />
      <div className="Profile-center">
        <Pcard location="profilePage" />
        <div className="PostSide">
          <Respnav />
          <Posts />
        </div>
      </div>
      <RightSide />
    </div>
  );
};

export default Profile;
