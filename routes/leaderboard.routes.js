const LeaderBoard = require("../models/LeaderBoard.model");

const router = require("express").Router();

//Get all highscore
router.get("/", async (req, res, next) => {
  try {
    const allHighscore = await LeaderBoard.find();
    res.status(200).json(allHighscore);
  } catch (error) {
    console.log(error);
  }
});

//Get userspecific highscore
router.get("/user/:userid", async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userHighscore = await LeaderBoard.find({ userId: userId });
    res.status(200).json(userHighscore);
  } catch (error) {
    console.log(error);
  }
});

//Get gamespecific highscore
router.get("/game/:gameid", async (req, res, next) => {
  try {
    const { gameid } = req.params;
    const gameHighscore = await LeaderBoard.find({ gameId: gameid });
    res.status(200).json(gameHighscore);
  } catch (error) {
    console.log(error);
  }
});

//Create a new highscore
router.post("/", async (req, res, next) => {
  try {
    const inputObj = req.body;
    const createdHighScore = await LeaderBoard.create(inputObj);
    res.status(201).json(createdHighScore);
  } catch (error) {
    console.log(error);
  }
});

//Update one highscore
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const inputObj = req.body;
    const updatedHighScore = await LeaderBoard.findByIdAndUpdate(id, inputObj, {
      new: true,
    });
    res.status(200).json(updatedHighScore);
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const oneHighScore = await LeaderBoard.findByIdAndDelete(id);
    res.status(200).json(`${oneHighScore} was deleted`);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
