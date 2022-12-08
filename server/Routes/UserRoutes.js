import express from "express";
import authMiddleWare from "../Middleware/authMiddleware.js";
import {
  getUser,
  updateUser,
  deleteUser,
  followUser,
  unfollowUser,
  getAllUsers,
  getfollowingUsers,
  userSearch,
} from "../Controllers/UserController.js";

const router = express.Router();
router.get("/", getAllUsers);
router.get("/search", userSearch);
router.get("/followers", getfollowingUsers);
router.get("/:id", getUser);
router.put("/:id", authMiddleWare, updateUser);
router.delete("/:id", authMiddleWare, deleteUser);
router.put("/:id/follow", authMiddleWare, followUser);
router.put("/:id/unfollow", authMiddleWare, unfollowUser);
export default router;
