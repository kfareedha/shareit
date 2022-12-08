import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    activeStatus: {
      type: Boolean,
      default: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    verified: {
      type: Object,
      default: { mobile: false, email: false },
    },

    country: String,
    profilePicture: String,
    coverPicture: String,
    about: String,
    livesIn: String,
    worksAt: String,
    relationship: String,
    followers: [],
    following: [],
  },
  { timestamps: true }
);

const UserModel = mongoose.model("Users", UserSchema);
export default UserModel;
