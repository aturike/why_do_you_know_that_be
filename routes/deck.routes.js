const Deck = require("../models/Deck.model");

const router = require("express").Router();

//Get all decks
router.get("/", async (req, res, next) => {
  try {
    const allDecks = await Deck.find();
    res.status(200).json(allDecks);
  } catch (error) {
    console.log(error);
  }
});

//Create a new deck
router.post("/", async (req, res, next) => {
  try {
    const inputObj = req.body;
    const createdDeck = await Deck.create(inputObj);
    res.status(201).json(createdDeck);
  } catch (error) {
    console.log(error);
  }
});

//Get all random deck
router.get("/random", async (req, res, next) => {
  try {
    const count = await Deck.countDocuments();
    const randomSelection = await Deck.aggregate([
      { $sample: { size: count } },
    ]);
    res.status(200).json(randomSelection);
  } catch (error) {
    console.log(error);
  }
});

//Get on random deck
router.get("/random/:count", async (req, res, next) => {
  try {
    const { count } = req.params;
    const number = parseInt(count);
    const randomSelection = await Deck.aggregate([
      { $sample: { size: number } },
    ]);
    res.status(200).json(randomSelection);
  } catch (error) {
    console.log(error);
  }
});

//Get one deck
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneDeck = await Deck.findById(id);
    res.status(200).json(oneDeck);
  } catch (error) {
    console.log(error);
  }
});

//Update one deck
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const inputObj = req.body;
    const updatedDeck = await Deck.findByIdAndUpdate(id, inputObj, {
      new: true,
    });
    console.log("Updated new deck", updatedDeck);
    res.status(200).json(updatedDeck);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneDeck = await Deck.findByIdAndDelete(id);
    res.status(200).json(`${oneDeck} was deleted`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
