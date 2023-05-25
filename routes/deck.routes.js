const Deck = require("../models/Deck.model");
const mongoose = require("mongoose");
const router = require("express").Router();

const uploader = require("../middleware/cloudinary.config");

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

//Cloudinary request
router.post(
  "/cloudinary",
  uploader.single("imageUrl"),
  async (req, res, next) => {
    const imageUrl = req.body.path;
    try {
      res.status(201).json(imageUrl);
    } catch (error) {
      console.log(error);
    }
  }
);

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

//Get all admin deck in random order
router.get("/random/admin", async (req, res, next) => {
  try {
    const count = await Deck.countDocuments();
    const randomSelection = await Deck.aggregate([
      { $sample: { size: count } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user",
        },
      },
      { $addFields: { isAdmin: { $arrayElemAt: ["$user.isAdmin", 0] } } },
      { $match: { isAdmin: true } },
      { $project: { isAdmin: 0, user: 0 } },
    ]);
    res.status(200).json(randomSelection);
  } catch (error) {
    console.log(error);
  }
});

//Get all random decks by id
router.get("/random/:userId", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const count = await Deck.countDocuments();
    const randomSelection = await Deck.aggregate([
      { $sample: { size: count } },
      {
        $match: {
          $expr: { $eq: ["$userId", { $toObjectId: userId }] },
        },
      },
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
