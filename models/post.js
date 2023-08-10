const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  likes: [{ type: ObjectId, ref: "User" }],
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
