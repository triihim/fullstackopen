const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    req.token = authorization.substring(7);
  }
  next();
};

// This must be used after tokenExtractor since it relies on token being placed into request.
const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, config.JWT_SECRET);
  if(decodedToken) {
    req.user = { id: decodedToken.id, username: decodedToken.username };
  }
  next();
};

module.exports = {
  tokenExtractor,
  userExtractor
};