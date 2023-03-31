const Orphange = require("../../models/organaization");

module.exports = {
  getAllOrphanage: async (req, res) => {
    try {
      const orphanges = await Orphange.find({ type: "Orphanage" })
        .populate("residence")
        .populate("requirement").sort({createdAt:-1});

        
        const totalRecidence = oldAgeHomes[0].residence.length

      res.status(200).json({orphanges,totalRecidence})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
