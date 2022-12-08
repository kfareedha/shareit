import React, { useEffect } from "react";
import { getTimelinePosts } from "../../actions/postActions";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "./Posts.css";
import Post from "../Post/Post";
const Posts = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authReducer.authData);
  let { posts, loading } = useSelector((state) => state.postReducer);
  const refresh = useSelector((state) => state.postReducer.refresh);
  useEffect(() => {
    dispatch(getTimelinePosts(user._id));
  }, [refresh]);
  if (!posts) return "No Posts";
  if (params.id) posts = posts.filter((post) => post.userId === params.id);
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
