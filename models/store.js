const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
    item:{ type: String, required: true },
    discription:String,
    requirement:{ type:Number, required: true },
    unit:{ type: String, required: true },
    unitPrice:Number,
    totalPrice:Number,
    remaining:{ type:Number, required: true },
    status:{ type: String, required: true, default:"Active" },
    donations: [
        {
          type: ObjectId,
          ref: "StoreDonation",
        },
      ],


},
{
    timestamps: true,
})

module.exports = mongoose.model ("Store", storeSchema)