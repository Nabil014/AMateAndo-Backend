const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const generateToken = require("../utils/generateToken");
const { OAuth2Client } = require("google-auth-library");
const mongoose = require("mongoose");

const client = new OAuth2Client(
  "599718821872-hhje7rdvlv3cq5v55a1e2oe22ok6qd04.apps.googleusercontent.com"
);
router.post("/", async (req, res) => {
  const { email, lastName, name, token } = req.body;
  const user = await User.findOne({ email });
  const password = email + token

  if (!user) {
    const newUser = await User.create({
      email,
      name,
      password,
      lastName,
      verified: true,
    });
    res.json({
        email: newUser.email,
        name: newUser.name,
        token: generateToken(newUser._id),
        password: newUser.password,
        verified: newUser.verified,
        _id: newUser._id,
        isSuccess: true,
    });
} else {
    res.json(user);
  }
  //   try {
  //     const ticket = await client.verifyIdToken({
  //       idToken: token,
  //       audience:
  //         "599718821872-hhje7rdvlv3cq5v55a1e2oe22ok6qd04.apps.googleusercontent.com",
  //     });
  //     const payload = ticket.getPayload();
  //     console.log(req.body);
  //     res.send({
  //       payload,
  //       isSuccess: true,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     res.send({
  //       payload: {},
  //       isSuccess: false,
  //     });
  //   }
});

module.exports = router;
