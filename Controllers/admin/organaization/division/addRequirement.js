const Requirement = require("../../../../models/requirment");
const Organization = require("../../../../models/organaization");

module.exports = {
  addRequirement: async (req, res) => {
    try {
      const { orgId } = req.params;
      const { body } = req;
      const reuirement = await new Requirement({
        organization: orgId,
        item: body.item,
        requirement: body.requirement,
        requirementUnit: body.requirementUnit,
        totalPrice: body.totalPrice,
        unitPrice: body.unitPrice,
        needs: body.requirement,
      }).save();

      const organaization = await Organization.findByIdAndUpdate(
        orgId,
        {
          $push: { requirement: reuirement._id },
        },
        { new: true }
      );
      console.log(organaization);
      res.status(200).json({ message: "Requirement added successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
