const express = require("express");
require("dotenv").config();
const path = require("path");

const app = express();

app.get("/", function (req, res) {
  console.log("Get received");
  res.status(200).send("Received GET request");
});

app.get("/json", function (req, res) {
  console.log("JSON received");
  res.status(200).json({ "JSON Data": "True" });
});

app.get("/file", function (req, res) {
  console.log("File received");
  res.status(200).sendFile(path.join(__dirname, "app17.js"));
});

const server = app.listen(process.env.PORT, function () {
  console.log("Listening to port " + server.address().port);
});
