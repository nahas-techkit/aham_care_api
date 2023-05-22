const Donation = require("../../models/donation");
const Requirement = require("../../models/requirment");
const User = require("../../models/user");
const { sendMail } = require("../../lib/regardMail");
const generateInvoice = require("../../lib/generateInvoiceNo");


module.exports = async (req, res) => {
  try {
    const { body } = req;
    const invoiceNo = await generateInvoice();

    const savedDonation = await new Donation({
      organaizationId: body.organaizationId,
      userId: body.userId,
      requirmentId: body.requirmentId,
      invoiceNo,
      donatedItems: body.donatedItems,
      totalPrice: body.totalPrice,
      transactionId: body.transactionId,
    }).save();

    const { email, name } = await User.findById(body.userId);

    // const { requirement } = await Requirement.findById(
    //   savedDonation.requirmentId
    // );

    // savedDonation.donatedItems.forEach((element) => {
    //   let matchedIndex = requirement.findIndex(
    //     (obj) => obj.item == element.item
    //   );
    //   if (matchedIndex === -1) return;

    //   requirement[matchedIndex].needs -= element.quantity;
    // });

    // const updatedNeeds = await Requirement.findByIdAndUpdate(
    //   savedDonation.requirmentId,
    //   {
    //     $set: { requirement },
    //   },
    //   { new: true }
    // );

    const eMail = await sendMail(
      email,
      "Heartfelt Thanks for Your Donation via AahamCare",
      name,
      body.totalPrice
    );

   
    let message = "";
    if (eMail) {
      console.log("email send successful");
      message = ",Please check your email";
    } else {
      console.log("email failed");
    }

    res
      .status(200)
      .json(`Heartfelt Thanks for Your Donation via AahamCare ${message}`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
