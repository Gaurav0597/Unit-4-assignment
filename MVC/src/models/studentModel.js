const mongoose = require("mongoose");


const studentSchema = new mongoose.Schema(
    {
      roll_id: { type: Number, required: true },
      currentBatch: { type: Number, required: true},
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "user",
          required: true,
        },
        evaluationId:{ 
            type: mongoose.Schema.Types.ObjectId,
          ref: "evaluation",
          required: true,
        },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  module.exports= mongoose.model("student", studentSchema);
