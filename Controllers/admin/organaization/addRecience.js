const Organaization = require("../../../models/organaization");
const Recidence = require("../../../models/recidence");

module.exports = async (req, res) => {
  try {


    const { body } = req;
    const {orgId} = req.params
    const {file} = req

    console.log('messaGE-',body.name, orgId, );

    const savedRecidence = await new Recidence({
      organaization:orgId,
      name: body.name,
      age: body.age,
      place: body.place,
      photo: "/uploads/images/" + file.filename,
    }).save();

    const addId = await Organaization.findByIdAndUpdate(
      orgId,
      {
        $push: { residence: savedRecidence._id },
      },
      { new: true }
    );
    console.log(addId);

    res
      .status(200)
      .json({ recidence: savedRecidence, message: "Successfully added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
