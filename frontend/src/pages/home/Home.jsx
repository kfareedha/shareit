import React from "react";
import PostSide from "../../components/PostSide/PostSide";
import ProfileSide from "../../components/ProfileSide/ProfileSide";
import RightSide from "../../components/RightSide/RightSide";
import "./Home.css";
const Home = () => {
  return (
    <div className="Home">
      <div className="ProfileSide">
        <ProfileSide />
      </div>
      <div className="PostSide">
        <PostSide />
      </div>
      <div className="RightSide">
        <RightSide />
      </div>
    </div>
  );
};

export default Home;
