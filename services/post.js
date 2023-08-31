const Post = require("../models/post");
const User = require("../models/user");

async function getAll() {
  return Post.find({})
    .populate({
      path: "images", // Assuming "images" is the field that references the Image model
      select: "url altText", // Select the fields you want to populate
    })
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "_id username text createdAt", // Limit the fields to be populated
      },
    })
    .populate({
      path: "owner",
      select: "username",
    });
}

async function getAllPostByOwner(owner) {
  return Post.find({ owner }).sort("");
}

async function getById(id) {
  return Post.findById(id)
    .populate({
      path: "owner",
      select: "_id username createdAt",
      model: "User",
    })
    .populate({
      path: "comments",
      populate: {
        path: "author",
        select: "_id username text createdAt",
        model: "User",
      },
    })
    .populate({
      path: "images", // Assuming "images" is the field that references the Image model
      select: "url altText", // Select the fields you want to populate
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
  const post = await Post.findById(postId);

  if (post.likes.includes(userId)) {
    // User has already liked the post, remove their like
    post.likes = post.likes.filter(
      (likedUserId) => likedUserId.toString() !== userId
    );
  } else {
    // User hasn't liked the post, add their like
    post.likes.push(userId);
  }

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
