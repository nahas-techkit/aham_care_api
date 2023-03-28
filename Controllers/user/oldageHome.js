const OldageHome = require("../../models/organaization");

module.exports = {
  getAllOldageHome: async (req, res) => {
    try {
      const oldAgeHomes = await OldageHome.find({ type: "Oldage Home" })
        .populate("residence")
        .populate("requirement");
      

      res.status(200).json({oldAgeHomes})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
