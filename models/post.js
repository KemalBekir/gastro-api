const {
  model,
  Schema,
  Types: { ObjectId },
} = require("mongoose");

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  heroImage: {
    type: String, // Reference to the Image model
    required: true,
  },
  images: [{ type: ObjectId, ref: "Image" }],
  description: {
    type: String,
    required: true,
  },
  comments: [{ type: ObjectId, ref: "Comment" }],
  owner: { type: ObjectId, ref: "User" },
  likes: [{ type: ObjectId, ref: "User" }],
});

const Post = model("Post", postSchema);

module.exports = Post;
