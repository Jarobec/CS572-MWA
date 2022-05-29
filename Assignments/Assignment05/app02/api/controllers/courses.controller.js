const mongoose = require("mongoose");
const Student = mongoose.model(process.env.DB_STUDENT_MODEL);

const getAll = function (req, res) {
  let count = parseInt(
    process.env.DEFAULT_FIND_COUNT,
    process.env.INTEGER_CONVERSION_BASE
  );
  let offset = parseInt(
    process.env.DEFAULT_FIND_OFFSET,
    process.env.INTEGER_CONVERSION_BASE
  );
  const maxCount = parseInt(
    process.env.DEFAULT_MAX_FIND_LIMIT,
    process.env.INTEGER_CONVERSION_BASE
  );

  if (req.query && req.query.count) {
    count = parseInt(req.query.count, process.env.INTEGER_CONVERSION_BASE);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, process.env.INTEGER_CONVERSION_BASE);
  }
  if (isNaN(count) || isNaN(offset)) {
    res
      .status(400)
      .json({ message: "QueryString Offset and Count should be numbers" });
    return;
  }
  if (count > maxCount) {
    res.status(400).json({ message: "Cannot exceed count of " + maxCount });
    return;
  }

  const studentId = req.params.studentId;
  Student.findById(studentId)
    .select("courses")
    .exec(function (err, student) {
      const response = {
        status: 200,
        message: {},
      };
      if (err) {
        console.log("Error finding all courses for Student", student);
        response.status = 500;
        response.message = err;
      } else if (!student || student.courses.length === 0) {
        console.log("Courses not found for Student", student);
        response.status = 404;
        response.message = { message: "Courses not found" };
      } else {
        response.message = student.courses;
      }

      res.status(response.status).json(response.message);
    });
};

const getOne = function (req, res) {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;
  Student.findById(studentId)
    .select("courses")
    .exec(function (err, student) {
      const response = {
        status: 200,
        message: {},
      };
      if (err) {
        console.log("Error finding course for Student", student);
        response.status = 500;
        response.message = err;
      } else if (!student || !student.courses.id(courseId)) {
        console.log("Course not found for Student", student);
        response.status = 404;
        response.message = { message: "Course not found" };
      } else {
        response.message = student.courses.id(courseId);
      }

      res.status(response.status).json(response.message);
    });
};

module.exports = {
  getAll,
  getOne,
};
