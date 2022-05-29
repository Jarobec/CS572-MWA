const mongoose = require("mongoose");

const gameSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: Number,
  rate: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
  price: Number,
  minPlayers: {
    type: Number,
    min: 1,
    max: 18,
  },
  maxPlayers: {
    type: Number,
    min: 1,
    max: 18,
  },
  minAge: Number,
  designers: [String],
});

mongoose.model(process.env.DB_GAME_MODEL, gameSchema, "games");