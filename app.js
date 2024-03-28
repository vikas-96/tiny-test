const bodyParser = require("body-parser");
const express = require("express");
const app = express();
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //request parser

app.use(require("./src/router"));

app.use((req, res, next) => {
  const error = new Error("page not found");
  error.status = 404;
  next(error);
});

//internal server error
app.use((error, req, res) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

module.exports = app;
