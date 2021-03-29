const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const config = require("../utils/config");

// Eslint disable next line since name is unused at the moment.
// eslint-disable-next-line
const isValidUserData = ({ username, name, password }) => {
  return username && username.length >= 3 &&
    password && password.length >= 3;
};

router.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  return res.json(users);
});

router.post("/", async (req, res) => {
  if(isValidUserData(req.body)) {
    const passwordHash = await bcrypt.hash(req.body.password, +config.SALTROUNDS);
    const newUser = new User({
      username: req.body.username,
      name: req.body.name,
      passwordHash
    });

    const createdUser = await newUser.save();
    return res.status(201).json(createdUser);

  } else {
    return res.status(400).json({error: "invalid user details"});
  }
});

module.exports = router;