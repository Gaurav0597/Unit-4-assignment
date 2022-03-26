const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    userPicture: [{ type: String, required: true }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("gallery", gallerySchema);
