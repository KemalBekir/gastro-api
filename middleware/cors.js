module.exports = () => (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, DELETE, HEAD, PUT, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true"); // Allow credentials
  next();
};
