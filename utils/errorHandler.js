const mapErrors = require("./mappers");

function sendErrorResponse(res, err) {
  const error = mapErrors(err);
  console.error(err.message);
  res.status(400).json({ message: error });
}

module.exports = sendErrorResponse;
