const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isAuthenticated } = require("../middleware/jwt.middelware");

router.post("/signup", async (req, res, next) => {
  const salt = bcryptjs.genSaltSync(13);
  const hashed = bcryptjs.hashSync(req.body.password, salt);
  try {
    const userExists = await User.findOne({ username: req.body.username });

    if (!userExists) {
      await User.create({
        username: req.body.username,
        email: req.body.email,
        password: hashed,
      });
      res.status(201).json("Sign up good");
    } else {
      res.status(409).json("Username exists");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.post("/login", async (req, res, next) => {
  //checking if the user is in the DB
  try {
    const userExists = await User.findOne({ username: req.body.username });

    if (userExists) {
      if (bcryptjs.compareSync(req.body.password, userExists.password)) {
        const authToken = jwt.sign(
          { userId: userExists._id, username: userExists.username },
          process.env.TOKEN_SECRET,
          {
            algorithm: "HS256",
            expiresIn: "24h",
          }
        );
        res.status(200).json(authToken);
      } else {
        res.status(401).json("incorrect password");
      }
    } else {
      res.status(401).json("incorrect username");
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

router.get("/verify", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.payload.userId);
    if (user) {
      const sendDataUser = {
        isAdmin: user.isAdmin,
        _id: user._id,
        username: user.username,
      };

      res
        .status(200)
        .json({ message: "user is autenticated", payload: sendDataUser });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "interenal server error", error });
  }
});

router.get("/user/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "interenal server error", error });
  }
});

module.exports = router;
