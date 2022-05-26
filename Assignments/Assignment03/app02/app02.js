const express = require("express");
require("dotenv").config();
const routes = require("./api/routes");

const app = express();

app.use("/api", routes);

const server = app.listen(process.env.PORT, function () {
  console.log(`Server is running on port ${server.address().port}`);
});
