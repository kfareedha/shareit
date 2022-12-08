import axios from "axios";
const API = axios.create({ baseURL: "http://localhost:5000" });
export const getTimelinePosts = (id) => API.get(`/post/${id}/timeline`);
export const likePost = (id, userId) =>
  API.put(`/post/${id}/like`, { userId: userId });
export const addComment = (comment, userId, id) =>
  API.put(`/post/${id}/addcomment`, { comment, userId });
export const deletePost = (id, userId) => API.delete(`/post/${id}/${userId}`);
export const reportPost = (id, userId, data) =>
  API.put(`/post/${id}/${userId}/report`, data);
