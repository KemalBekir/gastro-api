const { verifySession } = require("../services/users");

module.exports = () => (req, res, next) => {
  const sessionCookie = req.cookies.session;

  try {
    if (sessionCookie) {
      const userData = verifySession(sessionCookie);
      req.user = userData;
    }
    next();
  } catch (err) {
    res.status(498).json({ message: "Invalid access token, Please login" });
  }
};
