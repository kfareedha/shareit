import mongoose from "mongoose";
const OTPSchema = mongoose.Schema({
  user: String,
  otp: String,
  createdAt: Date,
  expiresAt: Date,
});
const otpModel = mongoose.model("OTP", OTPSchema);
export default otpModel;
