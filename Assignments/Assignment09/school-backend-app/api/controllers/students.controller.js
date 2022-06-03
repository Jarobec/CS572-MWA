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

const _checkObjectIDIsValid = function (id) {
  if (!mongoose.isValidObjectId(id)) {
    _validationError({ message: "Invalid Student ID" });
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

const _successGetAddUpdateDelete = function (status, student) {
  response.status = status;
  response.message = student;
};

const getAll = function (req, res) {
  if (!_checkCountAndOffset(req)) {
    _sendResponse(res);
  } else {
    Student.find()
      .skip(offset)
      .limit(count)
      .exec()
      .then((students) => _successGetAddUpdateDelete(200, students))
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const getOne = function (req, res) {
  const studentId = req.params.studentId;

  if (!_checkObjectIDIsValid(studentId)) {
    _sendResponse(res);
  } else {
    Student.findById(studentId)
      .exec()
      .then((student) => {
        if (!student) {
          _notFoundError({ message: "Student ID not found" });
        } else {
          _successGetAddUpdateDelete(200, student);
        }
      })
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

const addOne = function (req, res) {
  const newStudent = {
    name: req.body.name,
    gpa: req.body.gpa,
    courses: [],
  };

  Student.create(newStudent)
    .then((student) => _successGetAddUpdateDelete(201, student))
    .catch((err) => _serverError(err))
    .finally(() => _sendResponse(res));
};

const _updateOne = function (req, res, updateStudentCallback) {
  const studentId = req.params.studentId;

  if (!_checkObjectIDIsValid(studentId)) {
    _sendResponse(res);
  } else {
    Student.findById(studentId)
      .exec()
      .then((student) => {
        if (!student) {
          _notFoundError({ message: "Student ID not found" });
          return;
        } else {
          return updateStudentCallback(req, student);
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

const fullUpdateOne = function (req, res) {
  studentUpdate = function (req, student) {
    student.name = req.body.name;
    student.gpa = req.body.gpa;
    return student.save();
  };
  _updateOne(req, res, studentUpdate);
};

const partialUpdateOne = function (req, res) {
  studentUpdate = function (req, student) {
    if (req.body.name) {
      student.name = req.body.name;
    }
    if (req.body.gpa) {
      student.gpa = req.body.gpa;
    }
    return student.save();
  };
  _updateOne(req, res, studentUpdate);
};

const deleteOne = function (req, res) {
  const studentId = req.params.studentId;
  if (!_checkObjectIDIsValid(studentId)) {
    _sendResponse(res);
  } else {
    Student.findByIdAndDelete(studentId)
      .exec()
      .then((student) => _successGetAddUpdateDelete(204, student))
      .catch((err) => _serverError(err))
      .finally(() => _sendResponse(res));
  }
};

module.exports = {
  getAll,
  getOne,
  addOne,
  fullUpdateOne,
  partialUpdateOne,
  deleteOne,
};
