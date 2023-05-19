const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const donationSchema = mongoose.Schema(
  {
    organaizationId: { type: ObjectId, ref: "Organization" },
    userId: { type: ObjectId, ref: "User" },
    requirmentId: { type: ObjectId, ref: "Requirement" },
    invoiceNo:{type:String},

    donatedItems: [
      {
        item: String,
        quantity: String,
        price: String,
      },
    ],
    totalPrice: Number,
    transactionId: String,
    status: { type: String, enum: ["Pending", "Processing","Completed"], default: "Pending"},
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Donation", donationSchema);
