const mongoose = require("mongoose");
const courseSchema = require("./courses-model");

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
