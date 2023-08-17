const router = require("express").Router();
const { isAuth, isOwner, isAdmin } = require("../middleware/guards");
const preload = require("../middleware/preload");
const sendErrorResponse = require("../utils/errorHandler");

router.get("/", async (req, res) => {
  const postId = req.params.id;
  const page = parseInt(req.query.page) || 1;
  const data = await api.getCommentsForPost(postId, page);
  res.json(data);
});

router.get("/:id", preload(), (req, res) => {
  //TODO - check and adjust preload Fn
  const comment = res.locals.post;
  res.json(comment);
});

router.put("/:id", preload(), isOwner(), async (req, res) => {
  const id = req.params.id;
  const comment = {
    text: req.body.text,
  };

  try {
    const result = await api.updateComment(id, comment);
    res.json(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});
