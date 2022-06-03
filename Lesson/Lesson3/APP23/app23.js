const express = require("express");
require("dotenv").config();
const path = require("path");
const routes = require("./api/routes");

const app = express();

app.use(function (req, res, next) {
  console.log(req.method, req.url);
  next();
});

app.use("/api", routes);
app.use(express.static(path.join(__dirname, "public")));

const server = app.listen(process.env.PORT, function () {
  console.log("Listening to port " + server.address().port);
});
