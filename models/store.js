const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
    item:String,
    discription:String,
    requirement:Number,
    unit:String,
    unitPrice:String,
    totalPrice:String,
    needs:String,
    status:String

},
{
    timestamps: true,
})

module.exports = mongoose.model ("Store", storeSchema)