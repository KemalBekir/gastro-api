const Post = require("../models/post");
const Comment = require("../models/comment");

async function getCommentsForPost(postId, page = 1) {
  const perPage = 10; // Number of comments per page
  const skip = (page - 1) * perPage; // Calculate the number of comments to skip

  try {
    const comments = await Comment.find({ post: postId })
      .populate({
        path: "author",
        select: "_id username createdAt",
      })
      .sort({ createdAt: -1 }) // Sort comments by descending createdAt
      .skip(skip) // Skip the specified number of comments
      .limit(perPage); // Limit the number of comments per page

    return comments;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error; // Propagate the error to the caller
  }
}

async function updateComment(id, comment) {
  const existing = await Comment.findById(id);
  existing.text = comment.text;

  await existing.save();

  return existing;
}

module.exports = {
  getCommentsForPost,
  updateComment,
};
