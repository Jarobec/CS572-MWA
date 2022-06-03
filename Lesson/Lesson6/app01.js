require("dotenv").config();
require("./api/data/db");
require("./api/data/db.connection").open();
const express = require("express");
const path = require("path");
const routes = require("./api/routes");

const app = express();

app.use(function (req, res, next) {
  console.log(`Method: ${req.method}, Url: ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  next();
});

app.use("/api", routes);
app.use(express.static(path.join(__dirname, "public")));

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).json({ error: err });
});

const server = app.listen(process.env.PORT, function () {
  console.log("Server is running on port " + server.address().port);
});
