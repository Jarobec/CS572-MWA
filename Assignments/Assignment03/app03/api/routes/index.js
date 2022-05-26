const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");

router.route("/students").get(studentController.getAll);
router.route("/students/:studentIndex").get(studentController.getStudent);

module.exports = router;
