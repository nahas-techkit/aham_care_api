const OldageHome = require("../../models/organaization");

module.exports = {
  getAllOldageHome: async (req, res) => {
    try {
      const oldAgeHomes = await OldageHome.find({ type: "Oldage Home" })
        .populate("residence")
        .populate("requirement").sort({createdAt:-1});

        const totalRecidence = oldAgeHomes[0].residence.length
      
      
      res.status(200).json({oldAgeHomes,totalRecidence})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
