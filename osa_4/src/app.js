const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const app = express();
const cors = require("cors");
const middleware = require("./utils/middleware");

const blogsController = require("./controllers/blogs");
const usersController = require("./controllers/users");
const loginController = require("./controllers/login");

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(cors());
app.use(express.json());
app.use(middleware.tokenExtractor);

app.use("/api/blogs", blogsController);
app.use("/api/users", usersController);
app.use("/api/login", loginController);

// disable eslint for next line due to unused next and req
// eslint-disable-next-line
app.use((error, req, res, next) => {
  if(process.env.NODE_ENV === "development") {
    console.error(error);
  }

  if(error.name === "ValidationError") return res.status(400).send({ error: error.message });
  if(error.name === "JsonWebTokenError") return res.status(401).send({ error: error.message });

  return res.status(500).send({error: error.message});

});

module.exports = app;