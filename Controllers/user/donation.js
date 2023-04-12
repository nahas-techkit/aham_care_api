const Donation = require("../../models/donation");
const Requirement = require("../../models/requirment");
const User = require("../../models/user")
const { sendmail } = require("../../lib/regardMail");

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const savedDonation = await new Donation({
      organaizationId: body.organaizationId,
      userId: body.userId,
      requirmentId: body.requirmentId,
      donatedItems: body.donatedItems,
      totalPrice: body.totalPrice,
      transactionId: body.transactionId,
    }).save();

    const {email} = await User.findById(body.userId)

    const { requirement } = await Requirement.findById(
      savedDonation.requirmentId
    );

    savedDonation.donatedItems.forEach((element) => {
      let matchedIndex = requirement.findIndex(
        (obj) => obj.item == element.item
      );
      if (matchedIndex === -1) return;

      requirement[matchedIndex].needs -= element.quantity;
    });

    const updatedNeeds = await Requirement.findByIdAndUpdate(
      savedDonation.requirmentId,
      {
        $set: { requirement },
      },
      { new: true }
    );

    sendmail({
      to: email,
      from: "rishad@techkit.in",
      subject: "hello this message from ahamcare",
    });

    res.status(200).json(updatedNeeds);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
