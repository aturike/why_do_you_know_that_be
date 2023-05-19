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
    res.status(201).json("New User created");
  } catch (error) {
    console.log(error);
  }
  res.status(201).json("Sign up good");
});

router.post("/login", async (req, res, next) => {
  //checking if the user is in the DB
  const userExists = User.findOne({ email: req.body.email });

  if (userExists) {
    if (bcryptjs.compareSync(req.body.password, userExists.password)) {
      const authToken = jwt.sign(
        { userId: userExists._id },
        process.env.TOKEN_SECRET,
        {
          algorithm: "HS256",
          expiresIn: "24h",
        }
      );
      res.json(authToken);
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
