const Store = require("../../models/store");
const StoreDonation = require("../../models/storeDonation");
const generateInvoiceNo = require("../../lib/generateInvoiceNo");

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const { remaining } = await Store.findById(body.storeId);

    if(remaining <= 0 ){
        return res.status(200).json({message:"This is full filled"})
    }

    if(remaining < body.donatedAmount){
        return res.status(400).json({message:`we want only ${remaining} rupees`} )
    }


    const invoiceNo= await generateInvoiceNo()

    const savedStoreDonation = await new StoreDonation({
      userId: body.userId,
      storeId: body.storeId,
      paymentId: body.paymentId,
      donatedAmount: body.donatedAmount,
      invoiceNo,
    }).save();

    const store = await Store.findByIdAndUpdate(savedStoreDonation.storeId, {
      $push: { donations: savedStoreDonation._id },
      $set: {remaining:remaining - savedStoreDonation.donatedAmount},
    });

    res.status(200).json({message:"Thankyou"})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
