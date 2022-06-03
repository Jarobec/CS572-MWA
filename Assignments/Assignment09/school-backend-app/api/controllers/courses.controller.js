const mongoose = require("mongoose");
const Student = mongoose.model(process.env.DB_STUDENT_MODEL);

let count = parseInt(
  process.env.DEFAULT_FIND_COUNT,
  process.env.INTEGER_CONVERSION_BASE
);
let offset = parseInt(
  process.env.DEFAULT_FIND_OFFSET,
  process.env.INTEGER_CONVERSION_BASE
);
const maxCount = parseInt(
  process.env.DEFAULT_FIND_COUNT_MAX,
  process.env.INTEGER_CONVERSION_BASE
);

const response = {
  status: 200,
  message: [],
};

const _clearResponse = function () {
  response.status = 200;
  response.message = [];
};

const _clearCountAndOffset = function () {
  count = parseInt(
    process.env.DEFAULT_FIND_COUNT,
    process.env.INTEGER_CONVERSION_BASE
  );
  offset = parseInt(
    process.env.DEFAULT_FIND_OFFSET,
    process.env.INTEGER_CONVERSION_BASE
  );
};

const _checkCountAndOffset = function (req) {
  if (req.query && req.query.count) {
    count = parseInt(req.query.count, process.env.INTEGER_CONVERSION_BASE);
  }
  if (req.query && req.query.offset) {
    offset = parseInt(req.query.offset, process.env.INTEGER_CONVERSION_BASE);
  }
  if (isNaN(count) || isNaN(offset)) {
    _validationError({
      message: "QueryString: offset and count should be numbers",
    });
    return false;
  } else {
    if (count > maxCount) {
      _validationError({
        message: "Cannot exceed count of " + maxCount,
      });
      return false;
    }
  }

  return true;
};

const _checkStudentIDIsValid = function (studentId) {
  if (!mongoose.isValidObjectId(studentId)) {
    _validationError({ message: "Invalid Student ID" });
    return false;
  }

  return true;
};

const _checkCourseIDIsValid = function (courseId) {
  if (!mongoose.isValidObjectId(courseId)) {
    _validationError({ message: "Invalid Course ID" });
    return false;
  }

  return true;
};

const _sendResponse = function (res) {
  res.status(response.status).json(response.message);
  _clearResponse();
  _clearCountAndOffset();
};

const _serverError = function (err) {
  response.status = 500;
  response.message = err;
};

const _validationError = function (err) {
  response.status = 400;
  response.message = err;
};

const _notFoundError = function (err) {
  response.status = 404;
  response.message = err;
};

const _successGetAddUpdateDelete = function (status, course) {
  response.status = status;
  response.message = course;
};

const getAll = function (req, res) {
  const studentId = req.params.studentId;

  if (!_checkStudentIDIsValid(studentId)) {
    _sendResponse(res);
  } else {
    Student.findById(studentId)
      .select("courses")
      .exec()
      .then((student) => {
        if (!student) {
          _notFoundError({ message: "Student ID not found" });
        } else if (student && !student.courses.length === 0) {
          _notFoundError({ message: "Courses not found" });
        } else {
          _successGetAddUpdateDelete(200, student.courses);
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const getOne = function (req, res) {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  if (!_checkStudentIDIsValid(studentId) || !_checkCourseIDIsValid(courseId)) {
    _sendResponse(res);
  } else {
    Student.findById(studentId)
      .select("courses")
      .exec()
      .then((student) => {
        if (!student) {
          _notFoundError({ message: "Student ID not found" });
        } else if (student && !student.courses.id(courseId)) {
          _notFoundError({ message: "Course ID not found" });
        } else {
          _successGetAddUpdateDelete(200, student.courses.id(courseId));
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const addOne = function (req, res) {
  const studentId = req.params.studentId;

  if (!_checkStudentIDIsValid(studentId)) {
    _sendResponse(res);
  } else {
    Student.findById(studentId)
      .select("courses")
      .exec()
      .then((student) => {
        if (!student) {
          _notFoundError({ message: "Student ID not found" });
          return;
        } else {
          return _addCourse(req, student);
        }
      })
      .then((updatedStudent) => {
        if (updatedStudent) {
          _successGetAddUpdateDelete(201, updatedStudent);
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const _addCourse = function (req, student) {
  const newCourse = { name: req.body.name, block: req.body.block };
  student.courses.push(newCourse);
  return student.save();
};

const _updateOne = function (req, res, courseUpdateCallback) {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  if (!_checkStudentIDIsValid(studentId) || !_checkCourseIDIsValid(courseId)) {
    _sendResponse(res);
  } else {
    Student.findById(studentId)
      .select("courses")
      .exec()
      .then((student) => {
        if (!student) {
          _notFoundError({ message: "Student ID not found" });
          return;
        } else if (student && !student.courses.id(courseId)) {
          _notFoundError({ message: "Course ID not found" });
          return;
        } else {
          return courseUpdateCallback(req, student);
        }
      })
      .then((updatedStudent) => {
        if (updatedStudent) {
          _successGetAddUpdateDelete(204, updatedStudent);
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const _fullCourseUpdateOne = function (req, student) {
  let course = student.courses.id(req.params.courseId);
  course.name = req.body.name;
  course.block = req.body.block;

  return student.save();
};

const _partialCourseUpdateOne = function (req, student) {
  let course = student.courses.id(req.params.courseId);

  if (req.body.name) {
    course.name = req.body.name;
  }
  if (req.body.block) {
    course.block = req.body.block;
  }

  return student.save();
};

const fullUpdateOne = function (req, res) {
  _updateOne(req, res, _fullCourseUpdateOne);
};
const partialUpdateOne = function (req, res) {
  _updateOne(req, res, _partialCourseUpdateOne);
};

const deleteOne = function (req, res) {
  const studentId = req.params.studentId;
  const courseId = req.params.courseId;

  if (!_checkStudentIDIsValid(studentId) || !_checkCourseIDIsValid(courseId)) {
    _sendResponse(res);
  } else {
    Student.findById(studentId)
      .select("courses")
      .exec()
      .then((student) => {
        if (!student) {
          _notFoundError({ message: "Student ID not found" });
          return;
        } else if (student && !student.courses.id(courseId)) {
          _notFoundError({ message: "Course ID not found" });
          return;
        } else {
          return _deleteCourse(req, student);
        }
      })
      .then((updatedStudent) => {
        if (updatedStudent) {
          _successGetAddUpdateDelete(204, updatedStudent);
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const _deleteCourse = function (req, student) {
  student.courses.id(req.params.courseId).remove();

  return student.save();
};

module.exports = {
  getAll,
  getOne,
  addOne,
  fullUpdateOne,
  partialUpdateOne,
  deleteOne,
};
