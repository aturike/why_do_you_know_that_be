const router = require("express").Router();

router.post("/signup", (req, res, next) => {
  res.status(201).json("Sign up good");
  //Check user exists?
});

router.post("/login", (req, res, next) => {
  res.status(200).json("Login good");
});

module.exports = router;
