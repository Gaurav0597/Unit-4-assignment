const express = require("express");
const Submission = require("../models/submissionModel");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const submissions = await Submission.create(req.body);
    return res.status(201).send(submissions);
  } catch (err) {
    return res.status(500).send(err.message);
  }
});

//!  fetch the student with his personal details who scored the highest marks in the evaluation

router.get("/:id", async (req, res) => {
  try {
    const submissions = await Submission
      .find({evaluationId:req.params.id})
      .populate({
        path: "studentId", select:{userId:1, _id:0},
        populate: { path: "userId" },
      })
      .sort({marks: -1})
      .limit(1)
      .lean()
      .exec();
    return res.status(200).send(submissions);
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = router;
