const Organaization = require("../../../models/organaization");
const Divisions = require("../../../models/division");
const { addRequirment } = require("./addRequirments");
const uploadFiles = require("../../../utils/uploads/uploadFiles");

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const { files } = req;
    const { name } = await Divisions.findById(body.typeId);
    const uploadedFile = await uploadFiles(files);
    const pdf = uploadedFile.filter((item, i) => item.fieldname === "pdf");
    const photo = uploadedFile.filter((item, i) => item.fieldname === "photo");

    console.log("pdf", uploadedFile);

    const savedOrganaization = await new Organaization({
      typeId: body.typeId,
      type: name,
      name: body.name,
      address: body.address,
      discription: body.discription,
      photo: "uploads/images/" + photo[0].filename,
      documents: "uploads/pdf/" + pdf[0].filename,
      place: body.place,
      email: body.email,
      phone: body.phone_no,
    }).save();

    res.status(200).json({
      message: "Organaization created successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
