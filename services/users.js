const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const blacklist = [];

async function register(username, email, password) {
  const existing = await User.findOne({ email: new RegExp(`^${email}$`, "i") });
  if (existing) {
    throw new Error("Email already exist");
  }
  const user = new User({
    username,
    email,
    hashedPassword: await bcrypt.hash(password, 10),
  });

  await user.save();

  return createSession(user);
}

function createSession(user) {
  return {
    email: user.email,
    _id: user._id,
    accessToken: jwt.sign({
      email: user.email,
      _id: user._id,
      role: user.role,
    }),
  };
}

function verifySession(token) {
  if (blacklist.includes(token)) {
    throw new Error("Toke is invalidated");
  }

  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return {
    email: payload.email,
    _id: payload._id,
    role: payload.role,
    token: token,
  };
}


module.exports = {
    register,
}