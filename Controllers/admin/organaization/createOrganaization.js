const Organaization = require("../../../models/organaization");

const { addRequirment } = require("./addRequirments");

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const { files } = req;
    console.log(body.type === "Oldage Home");
    const pdf = files.filter((item, i) => item.fieldname === "pdf");
    // const excel = files.filter((item, i) => item.fieldname === "excel");
    const photo = files.filter((item, i) => item.fieldname === "photo");
 
    const savedOrganaization = await new Organaization({
      type: body.type,
      name: body.name,
      address: body.address,
      discription: body.discription,
      photo: "uploads/images/" + photo[0].filename,
      documents: "uploads/pdf/" + pdf[0].filename,
      place:body.place,
      email:body.email,
      phone:body.phone_no
    }).save();
    const requirement = await addRequirment(excel[0], savedOrganaization._id);
    console.log("requirement=>",requirement);

    const addRequirementId = await Organaization.findByIdAndUpdate(
      savedOrganaization._id,
      {
        requirement: requirement._id,
      },
      { new: true }
    );

    res
      .status(200)
      .json({
        organaization: addRequirementId,
        message: "Organaization created successfully",
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
