const EventDonation = require("../../models/eventDonation");
const Event = require("../../models/event");

  module.exports = async (req, res) => {
  try {
    const { body } = req;
    const { remainingTickets } = await Event.findById(body.eventId);

    if (remainingTickets <= 0) {
      return res.status(400).json({ message: "No more tickets available" });
    }

    if (remainingTickets < body.donatedTickets) {
      return res
        .status(400)
        .json({ message: `only ${remainingTickets} tickets are available` });
    }

    const savedEventDonation = await new EventDonation({
      userId: body.userId,
      eventId: body.eventId,
      paymentId: body.paymentId,
      donatedTickets: body.donatedTickets,
      totalAmount: body.totalAmount,
    }).save();

    await Event.findByIdAndUpdate(
      savedEventDonation.eventId,
      {
        $push: { donations: savedEventDonation._id },
        $set: {
          remainingTickets:
            remainingTickets - savedEventDonation.donatedTickets,
        },
      },
      { new: true }
    );

    res.status(200).json({ message: "Thankyou for your donation" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
