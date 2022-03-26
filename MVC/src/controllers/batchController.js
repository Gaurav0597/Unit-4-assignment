const express = require("express");
const Batch = require("../models/batchModel");


const router = express.Router();

router.post("/", async (req, res) => {
    try {
      const batch = await Batch.create(req.body);
      return res.status(200).send(batch);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  module.exports = router;
