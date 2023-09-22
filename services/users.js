const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const blacklist = [];

async function register(req, res) {
  const { username, email, password } = req.body; // Change this to req.body

  try {
    const existing = await User.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });

    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const user = new User({
      username,
      email,
      hashedPassword: await bcrypt.hash(password, 10),
    });

    await user.save();

    const sessionData = createSessionData(user);
    setSessionCookie(res, sessionData);

    res.status(201).json({ message: "Registration successful", sessionData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: new RegExp(`^${email}$`, "i") });

    if (!user) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const match = await bcrypt.compare(password, user.hashedPassword);

    if (!match) {
      return res.status(401).json({ message: "Incorrect email or password" });
    }

    const sessionData = createSessionData(user);
    setSessionCookie(res, sessionData);

    res.status(200).json({ message: "Login successful", sessionData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

function logout(req, res) {
  // Clear the session cookie
  res.clearCookie("session");

  // Optionally add the session token to the blacklist
  const token = req.cookies.session;
  if (token) {
    blacklist.push(token);
  }

  res.status(204).json({ message: "Logout successful" });
}

function createSessionData(user) {
  const accessToken = jwt.sign(
    {
      email: user.email,
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    email: user.email,
    _id: user._id,
    accessToken: accessToken,
  };
}

function setSessionCookie(res, sessionData) {
  res.cookie("session", sessionData.accessToken, {
    httpOnly: true,
    expires: new Date(Date.now() + process.env.JWT_EXPIRES_IN * 1000), // Set expiration time
  });
}

function verifySession(token) {
  if (blacklist.includes(token)) {
    throw new Error("Token is invalidated");
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
  login,
  register,
  logout,
  verifySession,
};
