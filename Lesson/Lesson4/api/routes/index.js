const express = require("express");
const path = require("path");
const router = express.Router();
const gamesController = require("../controllers/games.controller");

// router.route("/").get(function (req, res) {
//   console.log("Get received");
//   res.status(200).send("Hello");
// });

// router.route(["/json", "/j"]).get(jsonController.json);

router.route("/games").get(gamesController.getAll);
router.route("/games/:gameIndex").get(gamesController.getOne);

router.route("/file").get(function (req, res) {
  console.log("File received");
  res.status(200).sendFile(path.join(__dirname, "index.js"));
});

module.exports = router;
