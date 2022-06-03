const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students.controller");
const courseController = require("../controllers/courses.controller");

router
  .route("/students")
  .get(studentController.getAll)
  .post(studentController.addOne);
router
  .route("/students/:studentId")
  .get(studentController.getOne)
  .put(studentController.fullUpdateOne)
  .patch(studentController.partialUpdateOne)
  .delete(studentController.deleteOne);

router
  .route("/students/:studentId/courses")
  .get(courseController.getAll)
  .post(courseController.addOne);
router
  .route("/students/:studentId/courses/:courseId")
  .get(courseController.getOne)
  .put(courseController.fullUpdateOne)
  .patch(courseController.partialUpdateOne)
  .delete(courseController.deleteOne);

module.exports = router;
