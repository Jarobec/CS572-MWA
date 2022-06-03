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

module.exports = courseSchema;
