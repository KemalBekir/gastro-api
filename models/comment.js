const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const commentSchema = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    postId: {
      type: ObjectId,
      ref: "Post", // Reference to the Post model
    },
    author: { type: ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
