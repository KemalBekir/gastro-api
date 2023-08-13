const { isGuest, isAuth } = require("../middleware/guards");
const { register } = require("../services/users");
const sendErrorResponse = require("../utils/errorHandler");
const mapErrors = require("../utils/mappers");

const router = require("express").Router();

router.post("/register", isGuest(), async (req, res) => {
  try {
    if (req.body.password.trim() == "" || req.body.email.trim() == "") {
      throw new Error("Email and password are required");
    }

    const result = await register(
      req.body.username,
      req.body.email.trim().toLowerCase(),
      req.body.password.trim()
    );
    res.status(201).json(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

router.get("/profile", isAuth(), async (req, res) => {
  try {
    const result = await getProfile(req.user); //TODO - create getProfile
    res.status(200).json(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

router.post("/login", isGuest(), async (req, res) => {
  try {
    //TODO - create Login fn
    const result = await login(
      req.body.email.trim().toLowerCase(),
      req.body.trim()
    );
    res.json(result);
  } catch (err) {
    sendErrorResponse(res, err);
  }
});

router.get("/logout", (req, res) => {
  logout(req.user?.token);
  res.status(204).end();
});

module.exports = router;
