const User = require("../../models/user");
const Donations = require("../../models/donation");
const EventDonation = require("../../models/eventDonation");
const StoreDonation = require("../../models/storeDonation");
const deleteFile = require("../../lib/deleteFiles");
const organaization = require("../../models/organaization");

module.exports = {
  getProfileById: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findById(id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  editProfile: async (req, res) => {
    try {
      const { id } = req.params;
      const { body } = req;

      const updatedProfile = await User.findByIdAndUpdate(id, {
        $set: { body },
      });

      res.status(200).json(updatedProfile);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  addProfilePicture: async (req, res) => {
    try {
      const { id } = req.params;
      const { file } = req;

      const user = await User.findById(id);
      const dpImage = await User.findByIdAndUpdate(
        id,
        {
          profilePicture: "uploads/profile/" + file.filename,
        },
        { new: true }
      );

      if (user.profilePicture) {
        await deleteFile("public/" + user.profilePicture);
      }

      res
        .status(200)
        .json({ message: "Profile picture updated successfully", dpImage });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getDonations: async (req, res) => {
    try {
      console.log("donations");
      const { id } = req.params;
      const donations = await Donations.find({ userId: id })
        .populate({
          path: "organaizationId",
          select: "name",
        })
        .select("organaizationId  totalPrice createdAt");
      const storeDonation = await StoreDonation.find({ userId: id })
        .populate({ path: "storeId", select: "item" })
        .select("storeId  totalPrice createdAt");
      const eventDonation = await EventDonation.find({ userId: id })
        .populate({ path: "eventId", select: "event" })
        .select("eventId totalAmount createdAt");

      const orgDon = donations.map((item) => ({
        _id: item?._id,
        name: item?.organaizationId?.name,
        totalPrice: item?.totalPrice,
        createdAt: item?.createdAt,
        type: "organaization",
      }));
      const evnDon = eventDonation.map((item) => ({
        _id: item?._id,
        name: item?.eventId.event,
        totalPrice: item?.totalAmount,
        createdAt: item?.createdAt,
        type: "event",
      }));

      const strDon = storeDonation.map((item) => ({
        _id: item?._id,
        name: item?.storeId.event,
        totalPrice: item?.totalPrice,
        createdAt: item?.createdAt,
        type: "store",
      }));
      let allDonations = [...orgDon, ...evnDon, ...strDon];
      res.status(200).json(allDonations);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
