const mongoose = require("mongoose");


const evaluationSchema = new mongoose.Schema(
    {
      date_of_evaluation: { type: Date, required: true },
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
      },
  
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  

module.exports = mongoose.model("evaluation", evaluationSchema);