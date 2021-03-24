require("dotenv").config();

const MONGODB_URI = process.env.NODE_ENV === "test" ? process.env.MONGODB_TEST_URI : process.env.MONGODB_URI;
const PORT = process.env.PORT;
const SALTROUNDS = process.env.SALTROUNDS;
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
  MONGODB_URI,
  PORT,
  SALTROUNDS,
  JWT_SECRET
};