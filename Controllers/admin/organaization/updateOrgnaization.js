const Organaization = require("../../../models/organaization");
const Requirements = require("../../../models/requirment");
const xlsx = require("xlsx");
const deleteFile = require("../../../lib/deleteFiles");

module.exports = {
  updateOrganaization: async (req, res) => {
    try {
      const { body } = req;
      const {id}=req.params
     

      const updatedData = await Organaization.findByIdAndUpdate(
        id,
        {
          name: body.name,
          address: body.address,
          discription: body.discription,
        },
        { new: true }
      );

      res.status(200).json({ updatedData, message: "Updated Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateRequirement: async (req, res) => {
    try {
      const { id } = req.params;
      const { file } = req;

      const workbook = xlsx.readFile(`public/uploads/excel/${file.filename}`);
      const sheet = workbook.Sheets["Sheet1"];
      const jsonData = xlsx.utils.sheet_to_json(sheet);

      const organization = await Organaization.findById(id);
      const requirement = await Requirements.findById(organization.requirement);
      const deleteStatus = await deleteFile(requirement.excelPath);
      console.log(deleteStatus);

      const updatedRequirment = await Requirements.findByIdAndUpdate(
        organization.requirement,
        {
          $set: {
            excelPath: `public/uploads/excel/${file.filename}`,
            requirement: jsonData,
          },
        }
      );

      res
        .status(200)
        .json({
          updatedRequirment,
          message: "Requirement updated successfully",
        });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateDocument: async (req,res)=>{
    try {
      const {id}=req.params
      const {file}= req


      const updatedData = await Organaization.findByIdAndUpdate(
        id,
        {
          documents:"uploads/pdf/" + file.filename
        },
        { new: true }
      );

      await deleteFile(`public/uploads/excel/${file.filename}`)

      res.status(200).json({ updatedData, message: "Updated Successfully" });


    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};
