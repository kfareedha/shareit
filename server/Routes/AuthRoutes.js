import express from "express";
import {
  registerUser,
  loginUser,
  sendOTP,
  verifyOTP,
} from "../Controllers/AuthControllers.js";

const router = express.Router();
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/sendotp", sendOTP);
router.post("/verifyotp", verifyOTP);

export default router;
