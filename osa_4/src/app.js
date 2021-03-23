const express = require("express");
require("express-async-errors");
const mongoose = require("mongoose");
const config = require("./utils/config");
const app = express();
const cors = require("cors");
const blogsController = require("./controllers/blogs");

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true });

app.use(cors());
app.use(express.json());

app.use("/api/blogs", blogsController);

app.use((error, req, res, next) => {
  if(process.env.NODE_ENV !== "test") {
    console.error(error);
  }

  if(error.name === "ValidationError") return res.status(400).send({ error: error.response.error });

  res.status(500).send({error: error.response.error});
});

module.exports = app;