import PostModel from "../Models/postModels.js";
import mongoose from "mongoose";
import UserModel from "../Models/userModel.js";
// Creat new Post
export const createPost = async (req, res) => {
  // console.log("ethipost");
  const newPost = new PostModel(req.body);

  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Create new Post
export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostModel.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
// Update a post
export const updatePost = async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;

  try {
    const post = await PostModel.findById(postId);
    if (post.userId === userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("Post Updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//Delete post
export const deletePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.params.uid;
  console.log(userId, "DELU");
  try {
    const post = await PostModel.findById(postId);
    console.log(post.userId, "postID");
    if (post.userId === userId) {
      await post.deleteOne();
      res.status(200).json("Post deleted");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//like/dislike a post
export const likePost = async (req, res) => {
  const postid = req.params.id;
  // console.log(postid);
  const { userId } = req.body;
  // console.log(userId);
  try {
    const post = await PostModel.findById(postid);
    // console.log(post);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post liked");
      // console.log("RRRR");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post disliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
//getTimeline Posts
export const getTimelinePosts = async (req, res) => {
  // console.log("keri");
  const userId = req.params.id;
  // console.log(userId, "kiti");
  try {
    const currentUserposts = await PostModel.find({ userId: userId });
    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    // console.log(followingPosts, "posts");
    res.status(200).json(
      currentUserposts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.craetedAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
};
//adding comments
export const addComment = async (req, res) => {
  try {
    // console.log(req.body, "req.body comment");
    const postid = req.params.id;
    // console.log(postid, "comment");
    const userId = req.body.userId;
    // console.log(userId, "comment");

    // console.log(req.body.comment, "nnnn");
    if (req.body.comment == null) {
      return res.json({ message: "Add any comment" });
    }
    let commented = await PostModel.updateOne(
      { _id: postid },
      {
        $push: {
          comments: {
            comment: req.body.comment,
            commentBy: req.body.userId,
          },
        },
      }
    );

    res.json(commented);
  } catch (error) {
    res.status(500).json(error);
  }
};
// saved Post
export const savedPost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.params.uid;

  const user = await UserModel.findOne({ _id: userId });

  if (user?.saved.includes(postId)) {
    await user.updateOne({ $pull: { saved: postId } });
    res.status(200).json("Post removed");
  } else {
    await user.updateOne({ $push: { saved: postId } });
    res.status(200).json("Post saved");
  }
};
// report post

export const reportPost = async (req, res) => {
  const postId = req.params.id;
  console.log(postId, "postid");
  const userId = req.params.uid;
  const post = await PostModel.findById(postId);
  console.log(post, "got post");
  if (post) {
    try {
      const post = await PostModel.findByIdAndUpdate(postId, req.body, {
        new: true,
      });
      console.log(post, "yeahhh");
    } catch (err) {
      console.log(err);
    }
  }
};
