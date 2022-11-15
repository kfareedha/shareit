import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/postActions";
import { useSelector, useDispatch } from "react-redux";

import "./Posts.css";

import Post from "../Post/Post";
const Posts = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  useEffect(() => {
    console.log("fetching");
    dispatch(getTimelinePosts(user._id));
  }, []);
  return (
    <div className="Posts">
      {loading
        ? "Fetching Posts..."
        : posts.map((post, id) => {
            return <Post data={post} id={id} />;
          })}
    </div>
  );
};

export default Posts;
