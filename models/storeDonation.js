const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storeDonationSchema = mongoose.Schema(
  {
    userId: { type: ObjectId, ref: "User" },
    storeId: { type: ObjectId, ref: "Event" },
    paymentId: { type: String, require: true },
    donatedAmount: { type: Number, require: true },
    status: {
      type: String,
      enum: ["Received", "Processing", "Completed", "Deleted"],
      default: "Received",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("StoreDonation", storeDonationSchema);
