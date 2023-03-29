const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const requirementScheam = mongoose.Schema(
  {
    organization: { type: ObjectId, ref: "Oldage" },
    excelPath: String,
    requirement: [
      {
        item: { type: String, required: true },
        requirement: { type: Number, required: true },
        requirementUnit: { type: String, required: true },
        price: { type: Number, required: true },
        needs: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Requirement", requirementScheam);
