const Post = require("../models/post");
const User = require("../models/user");

async function getAll() {
  return Post.find({});
}

async function getAllPostByOwner(owner) {
  return Post.find({ owner }).sort("");
}

async function getById(id) {
  return Post.findById(id).populate({
    path: "owner",
    select: ["email", "username"],
  });
}

async function create(post) {
  const result = new Post(post);
  await result.save();

  const user = await User.findById(result.owner);
  user.myPosts.push(result._id);
  await user.save();

  return result;
}

async function updatePost(id, post) {
  const existing = await Post.findById(id);

  existing.title = post.title;
  existing.image = post.image;
  existing.description = post.description;

  await existing.save();

  return existing;
}

async function deleteById(id) {
  await Post.findByIdAndDelete(id);
}

async function searchFunction(text) {
  //TODO - update search criteria
  return Post.find({
    $or: [
      { title: { $regex: `${text}`, $options: "i" } },
      //   { type: { $regex: `${text}`, $options: "i" } },
    ],
  });
}

async function postIsLiked(postId, userId) {
  const post = await Post.find(postId);

  if (post.likes.includes(userId)) {
    post.filter((x) => x._id !== userId);
  }
  post.likes.push(userId);
  await post.save();
}

module.exports = {
  getAll,
  getAllPostByOwner,
  getById,
  create,
  updatePost,
  deleteById,
  searchFunction,
  postIsLiked,
};
