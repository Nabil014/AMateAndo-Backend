const express = require("express");
const router = express.Router();
const User = require("../models/user.model");
const upload = require("../../libs/storage");
const cloudinary = require("../utils/cloudinary");

router.post("/", async (req, res) => {
  const { name, lastName, email, password, cellPhone } = req.body;
  try {
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.send("El usuario ya existe");
    }
    const newUser = new User({
      name,
      lastName,
      email,
      password,
      cellPhone,
      // picture: result.secure_url,
    });
    newUser.password= await newUser.encryptPass(password)
    await newUser.save();
    console.log(newUser)
    res.redirect('http://localhost:3001/');
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
});
router.get("/", async (req, res) => {
  try {
    User.find({}, function (err, users) {
      res.status(200).send(users);
    });
  } catch (error) {
    res.status(400).send('Users not found')
        console.log(error)
  }
});

router.get("/:email", async (req, res) => {
    try {
      User.find({email: req.params.email},(error, user)=>{
            res.json(user)
        })
    }
    catch(error) {
        res.status(500).send(error)
    }
  })
module.exports = router;
