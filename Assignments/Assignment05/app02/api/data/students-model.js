const mongoose = require("mongoose");

const courseSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  block: {
    type: String,
    required: true,
  },
});

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  gpa: {
    type: Number,
    min: 0.0,
    max: 4.0,
    required: true,
  },
  courses: [courseSchema],
});

mongoose.model(process.env.DB_STUDENT_MODEL, studentSchema, "students");
