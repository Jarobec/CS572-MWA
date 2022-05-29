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

  Student.find()
    .skip(offset)
    .limit(count)
    .exec(function (err, students) {
      const response = {
        status: 200,
        message: students,
      };
      if (err) {
        console.log("Error finding all students");
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
};

const getOne = function (req, res) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function (err, student) {
    const response = { status: 200, message: student };
    if (err) {
      console.log("Error finding student");
      response.status = 500;
      response.message = err;
    } else if (!student) {
      console.log("Student id not found", studentId);
      response.status = 404;
      response.message = { message: "Student ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};

const addOne = function (req, res) {
  const newStudent = {
    name: req.body.name,
    gpa: req.body.gpa,
  };
  Student.create(newStudent, function (err, student) {
    const response = { status: 201, message: student };
    if (err) {
      console.log("Error creating student");
      response.status = 500;
      response.message = err;
    }
    res.status(response.status).json(response.message);
  });
};

const _updateOne = function (req, res, updateStudentCallback) {
  const studentId = req.params.studentId;
  Student.findById(studentId).exec(function (err, student) {
    const response = { status: 204, message: student };
    if (err) {
      console.log("Error updating student");
      response.status = 500;
      response.message = err;
    } else if (!student) {
      console.log("Student ID not found", studentId);
      response.status = 404;
      response.message = { message: "Student ID not found" };
    }
    if (response.status !== 204) {
      res.status(response.status).json(response.message);
    } else {
      updateStudentCallback(req, res, student, response);
    }
  });
};

const fullUpdateOne = function (req, res) {
  studentUpdate = function (req, res, student, response) {
    student.name = req.body.name;
    student.gpa = req.body.gpa;

    student.save(function (err, updatedStudent) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, studentUpdate);
};

const partialUpdateOne = function (req, res) {
  studentUpdate = function (req, res, student, response) {
    if (req.body.name) {
      student.name = req.body.name;
    }
    if (req.body.gpa) {
      student.gpa = req.body.gpa;
    }

    student.save(function (err, updatedStudent) {
      if (err) {
        response.status = 500;
        response.message = err;
      }
      res.status(response.status).json(response.message);
    });
  };
  _updateOne(req, res, studentUpdate);
};

const deleteOne = function (req, res) {
  const studentId = req.params.studentId;
  Student.findByIdAndDelete(studentId).exec(function (err, deletedStudent) {
    const response = { status: 204, message: deletedStudent };
    if (err) {
      console.log("Error deleting student");
      response.status = 500;
      response.message = err;
    } else if (!deletedStudent) {
      console.log("Student ID not found", studentId);
      response.status = 404;
      response.message = { message: "Student ID not found" };
    }
    res.status(response.status).json(response.message);
  });
};

module.exports = {
  getAll,
  getOne,
  addOne,
  fullUpdateOne,
  partialUpdateOne,
  deleteOne,
};
