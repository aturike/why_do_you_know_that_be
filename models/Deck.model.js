const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const deckSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  question: {
    type: String,
    required: true,
  },
  cards: {
    type: [{ text: String, value: Number, img: String }],
    required: true,
  },
});

const Deck = model("Deck", deckSchema);

module.exports = Deck;
