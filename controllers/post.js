const router = require("express").Router();
const { isAuth, isOwner, isAdmin } = require("../middleware/guards");
const preload = require("../middleware/preload");
const Comment = require("../models/comment");
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
  const post = {
    title: req.body.title,
    image: req.body.image,
    description: req.body.description,
    owner: req.body.owner,
    likes: req.body.likes,
  };

  try {
    const result = await api.create(post);
    res.status(201).json(result);
  } catch (err) {
    sendErrorResponse(res, err);
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
