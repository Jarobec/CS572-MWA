require("dotenv").config();
require("./api/data/db");
const express = require("express");
const routes = require("./api/routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.use(function (err, req, res, next) {
  const response = { status: 0, message: [] };
  if (err.error) {
    response.status = 500;
    response.message = err;
  } else if (!err.document) {
    response.status = 404;
    response.message = { message: err.modelName + " not found" };
  } else {
    response.status = 200;
    response.message = err.document;
  }

  res.status(response.status).json(response.message);
});

const server = app.listen(process.env.PORT, function () {
  console.log("Server is running on port", server.address().port);
});
