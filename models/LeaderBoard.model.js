const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const leaderboardSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  score: {
    type: Number,
  },
});

const LeaderBoard = model("LeaderBoard", leaderboardSchema);

module.exports = LeaderBoard;
