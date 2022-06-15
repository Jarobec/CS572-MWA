const express = require("express");
const gamesRoutes = require("./games");
const usersRoutes = require("./users");

const router = express.Router();

router.use("/games", gamesRoutes);
router.use("/users", usersRoutes);

module.exports = router;
