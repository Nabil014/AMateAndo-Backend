const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");

router.post("/", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    if (user.visibility === false) {
      return res
        .status(401)
        .send({ message: "Tu usuario ha sido baneado de Nomade" });
    }
  } 
    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        lastname: user.lastName,
        cellPhone: user.cellPhone,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).send("Invalid email or password");
    }
});

module.exports = router;
