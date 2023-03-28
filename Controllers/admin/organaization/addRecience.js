const Organaization = require("../../../models/organaization");
const Recidence = require("../../../models/recidence");

module.exports = async (req, res) => {
  try {
    const { body } = req;
    const {id} = req.params

    const savedRecidence = await new Recidence({
      type:body.type,
      name: body.name,
      age: body.age,
      address: body.address,
      photo: "/uploads/images/" + req.file.filename,
    }).save();

    const addId = await Organaization.findByIdAndUpdate(
      id,
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
    res.status(500).json({ message: error.message });
  }
};
