const User = require("../models/user.models");
const path = require("path");

const express = require("express");

const upload = require("../middlewares/fileUpload");


const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let users = await User.find({}).lean().exec();
    res.status(201).send(users);
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
});

router.post("/", upload.single("profilePic"), async (req, res) => {
  try {
    console.log(req.file.path);
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      profilePic: req.file.path,
    });
    res.send(user);
  } catch (err) {
    res.status(501).send({ message: err.message });
  }
});
module.exports = router;
