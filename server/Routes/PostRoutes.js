import express from "express";

import {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  getTimelinePosts,
  addComment,
  reportPost,
} from "../Controllers/PostController.js";
const router = express.Router();
router.post("/", createPost);
router.get("/:id", getPost);
router.put("/:id", updatePost);

router.put("/:id/like", likePost);
router.put("/:id/addcomment", addComment);
router.get("/:id/timeline", getTimelinePosts);
router.put("/:id/:uid/report", reportPost);
router.delete("/:id/:uid", deletePost);

export default router;
