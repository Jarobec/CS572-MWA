const express = require("express");
const path = require("path");
require("dotenv").config();

const app = express();

const indexUrl = path.join(__dirname, "../public/index.html");
const page1Url = path.join(__dirname, "../public/page1.html");
const page2Url = path.join(__dirname, "../public/page2.html");

app.get(["/", "/index"], function (req, res) {
  res.status(200).sendFile(indexUrl);
});

app.get("/page1", function (req, res) {
  res.status(200).sendFile(page1Url);
});

app.get("/page2", function (req, res) {
  res.status(200).sendFile(page2Url);
});

app.post("/", function (req, res) {
  const jsonResponse = {
    response: "Successfully",
    text: "This is a JSON from Express",
    method: "POST",
    url: "/",
  };
  res.status(200).json(jsonResponse);
});

const server = app.listen(process.env.PORT, function () {
  console.log("Server is running on port " + server.address().port);
});
