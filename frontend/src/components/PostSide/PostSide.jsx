import React from "react";
import "./PostSide.css";
import PostShare from "../PostShare/PostShare";
import Respnav from "../Respnav/Respnav";
import Posts from "../Posts/Posts";
const PostSide = () => {
  return (
    <div className="PostSide">
      <PostShare />
      <Respnav />
      <Posts />
    </div>
  );
};

export default PostSide;
