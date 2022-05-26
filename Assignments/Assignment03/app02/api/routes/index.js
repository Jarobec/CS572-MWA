const express = require("express");
const router = express.Router();
const calculatorController = require("../controllers//calculater.controller");

router.route("/multiply/:numberOne").get(calculatorController.multiply);

module.exports = router;
