const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middelware");

router.post("/signup", async (req, res, next) => {
  const salt = bcryptjs.genSaltSync(13);
  const hashed = bcryptjs.hashSync(req.body.password, salt);
  try {
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: hashed,
    });
    res.status(201).json("Sign up good");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res, next) => {
  //checking if the user is in the DB
  const userExists = await User.findOne({ username: req.body.username });

  if (userExists) {
    if (bcryptjs.compareSync(req.body.password, userExists.password)) {
      console.log("is this working");
      const authToken = jwt.sign(
        { userId: userExists._id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "24h",
        }
      );
      console.log(authToken);
      res.status(200).json(authToken);
    } else {
      res.json("incorrect password or username");
    }
  }
});

router.get("/verify", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.payload.userId);
  res.json({ message: "user is autenticated", payload: user });
});

module.exports = router;
