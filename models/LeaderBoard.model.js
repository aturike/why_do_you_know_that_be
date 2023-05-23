const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const leaderboardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: {
    type: String,
  },
  gameId: { type: Schema.Types.ObjectId, ref: "User" },
  score: {
    type: Number,
    required: true,
  },
});

const LeaderBoard = model("LeaderBoard", leaderboardSchema);

module.exports = LeaderBoard;
