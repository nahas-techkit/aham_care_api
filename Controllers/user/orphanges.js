const Orphange = require("../../models/organaization");

module.exports = {
  getAllOrphanage: async (req, res) => {
    try {
      const orphanges = await Orphange.find({ type: "Orphanage" })
        .populate("residence")
        .populate("requirement");
      

      res.status(200).json({orphanges})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
