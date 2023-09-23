const { isGuest, isAuth } = require("../middleware/guards");
const { register, login } = require("../services/users");
const sendErrorResponse = require("../utils/errorHandler");

const router = require("express").Router();

router.post("/register", isGuest(), async (req, res) => {
  try {
    if (req.body.password.trim() == "" || req.body.email.trim() == "") {
      throw new Error("Email and password are required");
    }
    await register(req, res); // Pass 'req' and 'res' as arguments
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
    const result = await login(req, res);
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
