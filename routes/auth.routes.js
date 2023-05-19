const router = require("express").Router();
const User = require("../models/User.model");
const bcryptjs = require("bcryptjs");

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
  const userExists = User.findOne({ email: req.body.email })

  if(userExists){
    if(bcryptjs.compareSync(req.body.password, userExists.password)){
      res.status(201).json("Sign in good");
    }else{
      res.json("incorrect password")
    }
  }
});

module.exports = router;
