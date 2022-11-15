import UserModel from "../Models/userModel.js";
import bcrypt from "bcrypt";
//get a user
export const getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await UserModel.findById(id);
    const { password, ...otherdetails } = user._doc;
    if (user) {
      res.status(200).json(otherdetails);
    } else {
      res.status(404).json("no such User");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

//Update user
export const updateUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, Adminstatus, password } = req.body;
  if (id === currentUserId || Adminstatus) {
    try {
      if (password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(password, salt);
      }
      const user = await UserModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied!, You cannot update other profiles");
  }
};

//Delete User
export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId, Adminstatus } = req.body;
  if (id === currentUserId || Adminstatus) {
    try {
      await UserModel.findByIdAndDelete(id);
      res.status(200).json("User deleted successfully");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("Access denied!, You cannot delete other profiles");
  }
};

//following User
export const followUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (id === currentUserId) {
    res.status(403).json("Denied!, You can only follow other profiles");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);
      if (!followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $push: { followers: currentUserId } });
        await followingUser.updateOne({ $push: { following: id } });
        res.status(200).json("User followed");
      } else {
        res.status(403).json("User already followed by You");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

//Unfollow User
export const unfollowUser = async (req, res) => {
  const id = req.params.id;
  const { currentUserId } = req.body;
  if (id === currentUserId) {
    res.status(403).json("Denied!, You can only follow other profiles");
  } else {
    try {
      const followUser = await UserModel.findById(id);
      const followingUser = await UserModel.findById(currentUserId);
      if (followUser.followers.includes(currentUserId)) {
        await followUser.updateOne({ $pull: { followers: currentUserId } });
        await followingUser.updateOne({ $pull: { following: id } });
        res.status(200).json("User unfollowed");
      } else {
        res.status(403).json("User is not  followed by You");
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
