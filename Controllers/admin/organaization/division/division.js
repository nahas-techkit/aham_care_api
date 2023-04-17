const DivisionSchema = require("../../../../models/division");
module.exports = {
  createDivison: async (req, res) => {
    try {
      const { body } = req;
      const division = await DivisionSchema.find();
      const savedDivision = await new DivisionSchema({
        name: body.name,
        discription: body.discription,
        order: division.length,
      }).save();

      res.status(200).json({message:'Division Added Successfully'})
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllDivision : async (req,res)=>{
    try {
        const allDivisions = await DivisionSchema.find()
        res.status(200).json(allDivisions)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  },

  
};
