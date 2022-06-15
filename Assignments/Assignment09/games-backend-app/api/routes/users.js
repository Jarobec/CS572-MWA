const express = require("express");
const router = express.Router();
const usersController = require("../controllers/users.controller");

router.route("").post(usersController.addOne).put(usersController.login);

module.exports = router;
