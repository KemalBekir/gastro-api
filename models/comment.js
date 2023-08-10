const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  post: {
    type: ObjectId,
    ref: "Post", // Reference to the Post model
  },
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
