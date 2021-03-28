const router = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const config = require("../utils/config");

router.post("/", async (req, res) => {
  const {username, password} = req.body;
  const user = await User.findOne({username});
  const passwordCorrect = user ? await bcrypt.compare(password, user.passwordHash) : false;

  if(!passwordCorrect) {
    return res.status(401).json({
      error: "Invalid login credentials"
    });
  }

  const token = jwt.sign({username, id: user._id}, config.JWT_SECRET);

  return res.status(200).json({token, username: user.username, name: user.name});
});

module.exports = router;