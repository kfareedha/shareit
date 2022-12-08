import React from "react";
import "./Respnav.css";
import Home from "../../img/home.png";

import Profile from "../../img/profile.png";
import Users from "../../img/people.png";
import Comment from "../../img/comment.png";

import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Respnav = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  return (
    <div className="navIcon  resp">
      <Link to="../home">
        <img src={Home} alt="" />
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to={`/profile/${user._id}`}
      >
        <img src={Profile} alt="" />
      </Link>
      <Link
        style={{
          textDecoration: "none",
        }}
        to={`/followers`}
      >
        <img src={Users} alt="" />
      </Link>
      <Link to="../chat">
        <img src={Comment} alt="" />
      </Link>
    </div>
  );
};

export default Respnav;
