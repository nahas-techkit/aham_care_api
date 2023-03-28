const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const recidenceSchema = mongoose.Schema(
  {
    type:{
      type:String,
      enum:["Oldage Home", "Orphanage"],
      require: true
    },
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Recidence", recidenceSchema);
