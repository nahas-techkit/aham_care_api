const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const eventDonationSchema = mongoose.Schema({
    userId:{type:ObjectId, ref:"User"},
    eventId:{type:ObjectId, ref:"Event"},
    paymentId:{type:String, require:true},
    donatedTickets:{type:Number, require:true},
    totalAmount:{type:Number, require:true}
},
{
    timestamps: true,
})

module.exports = mongoose.model("EventDonation",eventDonationSchema)