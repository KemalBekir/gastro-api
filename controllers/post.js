const router = require("express").Router();
const { isAuth, isOwner, isAdmin } = require("../middleware/guards");
const preload = require("../middleware/preload");
const Comment = require("../models/comment");
const Image = require("../models/image");
const api = require("../services/post");
const sendErrorResponse = require("../utils/errorHandler");

router.get("/", async (req, res) => {
  const data = await api.getAll();
  res.json(data);
});

router.get("/search", async (req, res) => {
  const { text } = req.query;
  try {
    const result = await api.searchFunction(text);
    res.json(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

router.post("/", isAuth(), async (req, res) => {
  try {
    // Create Image documents for each image URL
    const imageDocs = req.body.images.map((imageUrl) => {
      return new Image({ url: imageUrl, altText: "Image Alt Text" });
    });

    // Save the Image documents and get their IDs
    const savedImageDocs = await Promise.all(
      imageDocs.map((imageDoc) => imageDoc.save())
    );
    // Create the Post document with image IDs
    const imageIds = savedImageDocs.map((imageDoc) => imageDoc._id);

    const post = {
      title: req.body.title,
      heroImage: req.body.heroImage,
      images: imageIds,
      description: req.body.description,
      owner: req.user._id, // Assuming user ID is available after authentication
      likes: [], // Initialize likes as an empty array
    };

    // Save the Post document
    const createdPost = await api.create(post);
    res.status(201).json(createdPost); // Return the created post data
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(500).json({ message: "Failed to create post" });
  }
});

router.get("/:id", preload(), (req, res) => {
  const post = res.locals.post;
  res.json(post);
});

router.put("/:id", preload(), isOwner(), async (req, res) => {
  const id = req.params.id;
  const post = {
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    owner: req.body.owner,
    likes: req.body.likes,
  };

  try {
    const result = await api.updatePost(id, post);
    res.json(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

router.post("/:id/comments", isAuth(), async (req, res) => {
  try {
    const { postId, text, author } = req.body;

    const comment = new Comment({
      text,
      author,
      postId: postId,
    });

    await comment.save();

    const post = await api.getById(postId);
    post.comments.push(comment._id);
    await post.save();
    res.json(post);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

router.delete("/:id", preload(), isOwner(), async (req, res) => {
  try {
    const postId = req.params.id;
    await api.deleteById(postId);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

module.exports = router;
