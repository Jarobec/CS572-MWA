const express = require("express");
const router = express.Router();
const studentController = require("../controllers/students.controller");

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

module.exports = router;
