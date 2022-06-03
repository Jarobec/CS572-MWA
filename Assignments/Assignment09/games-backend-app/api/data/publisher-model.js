const mongoose = require("mongoose");

const publisherSchema = mongoose.Schema({
  name: String,
  location: {
    // Stored as longitude (E/W), latitude (N/S)
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
  },
  country: String,
  established: Number,
});

module.exports = publisherSchema;
