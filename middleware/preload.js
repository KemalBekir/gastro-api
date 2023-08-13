const { getById } = require("../services/post");

module.exports = () => async (req, res, next) => {
  const id = req.params.id;
  try {
    const post = await getById(id);
    post._ownerId = post.owner;
    res.locals.post = post;
    next();
  } catch (err) {
    res.status(404).json({ message: "Record not found" });
  }
};
