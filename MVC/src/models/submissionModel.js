const mongoose = require("mongoose");


const submissionSchema = new mongoose.Schema(
    {
      marks: { type:Number, required: true },
      evaluationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "evaluation",
        required: true,
      },
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "student",
        required: true,
      },
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );
  

module.exports = mongoose.model("submission", submissionSchema);
  