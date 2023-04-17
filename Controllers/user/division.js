const Division = require("../../models/division");

module.exports = {
  getAllDivision: async (req, res) => {
    try {
      const divisions = await Division.find();
      res.status(200).json(divisions);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
