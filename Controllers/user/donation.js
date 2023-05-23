const Donation = require("../../models/donation");
const Requirement = require("../../models/requirment");
const User = require("../../models/user");
const { sendMail } = require("../../lib/regardMail");
const getPaymentDetails = require("../../lib/getPaymentDetails");
const generateInvoice = require("../../lib/generateInvoiceNo");
const user = require("../../models/user");

module.exports = async (req, res) => {
  try {
    const { body } = req;

    const {id} = req.user;
    
    const invoiceNo = await generateInvoice();
    const paymentDetails = await getPaymentDetails(body?.paymentId);

    if (!paymentDetails) {
      res.status(400).json({ message: "invalid payment id" });
    }

    const { organization } = await Requirement.findById(
      body?.donatedItems[0]?.id
    );

    let grandTotal = 0;

    const donatedItems = await Promise.all(
      body?.donatedItems.map(async (item) => {
        console.log("item", item);
        const requirement = await Requirement.findById(item?.id);
        const price = requirement?.unitPrice * item?.count;
        grandTotal = +price;

        const Items = {
          requirmentId: requirement._id,
          item: requirement?.item,
          quantity: item?.count,
          unitPrice: requirement?.unitPrice,
          totalPrice: price,
        };

        const updatedRequirement = await Requirement.findByIdAndUpdate(
          item?.id,
          {
            needs: requirement.needs - item?.count,
            balancePrice: requirement?.balancePrice - price,
          },
          { new: true }
        );

        if (0 >= updatedRequirement.needs) {
          await Requirement.findByIdAndUpdate(
            item.id,
            {
              status: "Fulfilled",
            },
            { new: true }
          );
        }

        console.log(updatedRequirement, "up");

        return Items;
      })
    );


    console.log("di->", donatedItems);
    console.log("gt->", grandTotal);

    const savedDonation = await new Donation({
      organaizationId:organization,
      userId: body.userId,
      requirmentId: body.requirmentId,
      invoiceNo,
      donatedItems: body.donatedItems,
      totalPrice: body.totalPrice,
      transactionId: body.transactionId,
    }).save();

    const { email, name } = await User.findById(id);

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

    // const eMail = await sendMail(
    //   email,
    //   "Heartfelt Thanks for Your Donation via AahamCare",
    //   name,
    //   body.totalPrice
    // );

    // let message = "";
    // if (eMail) {
    //   console.log("email send successful");
    //   message = ",Please check your email";
    // } else {
    //   console.log("email failed");
    // }

    res.status(200).json(donatedItems);
    // .json(`Heartfelt Thanks for Your Donation via AahamCare ${message}`);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
