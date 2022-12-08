import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,

      required: true,
    },
    isReport: {
      type: Boolean,
      default: false,
    },
    desc: String,
    likes: [],
    image: String,
    comments: [
      {
        comment: {
          type: String,
        },
        commentBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        createdAt: {
          type: String,
          default: new Date().toDateString(),
        },
      },
    ],
  },

  {
    timestamps: true,
  }
);

var PostModel = mongoose.model("Posts", postSchema);
export default PostModel;
