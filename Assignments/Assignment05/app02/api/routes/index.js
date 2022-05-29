const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students.controller");
const courseController = require("../controllers/courses.controller");

router.route("/students").get(studentController.getAll);
router.route("/students/:studentId").get(studentController.getOne);

router.route("/students/:studentId/courses").get(courseController.getAll);
router
  .route("/students/:studentId/courses/:courseId")
  .get(courseController.getOne);

module.exports = router;
