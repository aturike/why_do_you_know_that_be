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
    //ONLY FOR TESTING
    const standardCard = [
      {
        text: "Rhino",
        value: 1,
        img: "https://tinyurl.com/2wttj549",
      },
      {
        text: "Monkey",
        value: 100,
        img: "https://tinyurl.com/2wttj549",
      },
      {
        text: "Dog",
        value: 55,
        img: "https://tinyurl.com/2wttj549",
      },
      {
        text: "Cat",
        value: 21,
        img: "https://tinyurl.com/2wttj549",
      },
      {
        text: "Doplhin",
        value: 34,
        img: "https://tinyurl.com/2wttj549",
      },
    ];
    const inputObj = req.body;
    const inputTestObj = { ...inputObj, cards: standardCard };

    const createdDeck = await Deck.create(inputTestObj);
    res.status(201).json(createdDeck);
  } catch (error) {
    console.log(error);
  }
});

//Get 1 random deck
router.get("/random", async (req, res, next) => {
  try {
    const randomSelection = await Deck.aggregate([{ $sample: { size: 1 } }]);
    console.log(randomSelection);
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
    //ONLY FOR TESTING
    const standardCard = [
      { text: "Rhino", value: 10, img: "test" },
      { text: "Monkey", value: 8, img: "test" },
    ];
    const inputObj = req.body;
    const inputTestObj = { ...inputObj, cards: standardCard };

    const updatedDeck = await Deck.findByIdAndUpdate(id, inputTestObj, {
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
