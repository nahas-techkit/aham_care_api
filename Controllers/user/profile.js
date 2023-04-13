const User = require("../../models/user");
const Donations = require("../../models/donation")
const EventDonation = require("../../models/eventDonation")
const StoreDonation = require ("../../models/storeDonation")
const deleteFile = require("../../lib/deleteFiles");


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
        const {id} = req.params
        const donations = await Donations.find({userId:id})
        console.log(donations);
        
        res.send(donations)

    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
