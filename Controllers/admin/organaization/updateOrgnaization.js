const Organaization = require("../../../models/organaization");
const Requirements = require("../../../models/requirment");
const xlsx = require("xlsx");
const deleteFile = require("../../../lib/deleteFiles");
const uploadFiles = require("../../../utils/uploads/uploadFiles");
const deleletCloudeFiles = require("../../../utils/uploads/deleteCloudeFile");

module.exports = {
  updateOrganaization: async (req, res) => {
    try {
      const { body } = req;
      const { id } = req.params;
      const { files } = req;

      console.log(files,body, id,"-<");

      const oldOrganization = await Organaization.findById(id);
      const updatedData = await Organaization.findByIdAndUpdate(
        id,
        {
          name: body.name,
          address: body.address,
          discription: body.discription,
        },
        { new: true }
      );

      if (files.length !== 0) {
        const uploadedFile = await uploadFiles(files);
        const pdf = uploadedFile.filter((item, i) => item.fieldname === "pdf");
        const photo = uploadedFile.filter(
          (item, i) => item.fieldname === "photo"
        );

        if (pdf.length !== 0) {
          console.log(pdf, "pdf");
          await Organaization.findByIdAndUpdate(id, {
            documents: pdf[0].path,
          });

          await deleteFile("public" + pdf[0].path);
          const response = await deleletCloudeFiles(oldOrganization.documents);
          console.log("response->", response);
        }
        
        if (photo.length !== 0) {
          console.log(photo, "photo");
          await Organaization.findByIdAndUpdate(id, {
            photo: photo[0].path,
          });

          const response = await deleletCloudeFiles(oldOrganization.photo);
          await deleteFile("public" + photo[0].path);
          console.log('response->',response);
        } 
      }else{
        console.log('nthg');
      }


      res.status(200).json({  message: "Updated Successfully" });
    } catch (error) {
      console.log(error);
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

      const updatedRequirment = await Requirements.findByIdAndUpdate(
        organization.requirement,
        {
          $set: {
            excelPath: `uploads/excel/${file.filename}`,
            requirement: jsonData,
          },
        }
      );

      const deleteStatus = await deleteFile("public/" + requirement.excelPath);

      res.status(200).json({
        updatedRequirment,
        message: "Requirement updated successfully",
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateDocument: async (req, res) => {
    try {
      const { id } = req.params;
      const { file } = req;

      const doc = await Organaization.findById(id);

      const updatedData = await Organaization.findByIdAndUpdate(
        id,
        {
          documents: "uploads/pdf/" + file.filename,
        },
        { new: true }
      );

      await deleteFile("public/" + doc.documents);

      res.status(200).json({ updatedData, message: "Updated Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateCoverPicture: async (req, res) => {
    try {
      const { id } = req.params;
      const { file } = req;
      const organaization = await Organaization.findById(id);
      const updatedData = await Organaization.findByIdAndUpdate(
        id,
        {
          photo: "uploads/images/" + file.filename,
        },
        { new: true }
      );

      const test = await deleteFile("public/" + organaization.photo);

      res.status(200).json({ updatedData, message: "Updated Successfully" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};
