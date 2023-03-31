const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({
    item:String,
    requirement:Number,
    unit:String,
    unitPrice:String,
    totalPrice:String,
    needs:String,
    status:String

})

module.exports = mongoose.model ("Store", storeSchema)