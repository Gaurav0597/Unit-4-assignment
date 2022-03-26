const express = require("express");
const Student = require("../models/studentModel");

const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const students = await Student.create(req.body);
      return res.status(201).send(students);

    } catch (err) {
      return res.status(500).send(err.message);
    }
  });


//! fetch all students who gave a particular evaluation

  router.get("/:id", async (req, res) => {
    try {
      const students = await Student
        .find({evaluationId:req.params.id})
        .populate({
          path: "userId",select:{firstName:1, _id:0}
        })
        .lean()
        .exec();
        console.log(students);

      return res.status(200).send(students);
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
  module.exports = router;
