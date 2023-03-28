const express = require("express");
const router = express.Router();
const createOldage = require("../Controllers/admin/organaization/createOrganaization");
const addImages = require("../Controllers/admin/organaization/addImages");
const addRecidence = require("../Controllers/admin/organaization/addRecience");
const updateOrganaization = require("../Controllers/admin/organaization/updateOrgnaization");

const multer = require("multer");

// Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let pathName = "public/uploads/excel";
    if (file.fieldname === "excel") {
      return cb(null, pathName);
    }

    if (file.fieldname === "pdf") {
      return cb(null, "public/uploads/pdf");
    }
    cb(null, "public/uploads/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Multer


// Organization Routs
router.post("/organaization", upload.any(), createOldage);
router.post("/addImages", upload.any(), addImages);
router.post("/addRecidence", upload.single("photo"), addRecidence);

router.put("/organaization/:id", updateOrganaization.updateOrganaization);
router.put(
  "/requirement/:id",
  upload.single("excel"),
  updateOrganaization.updateRequirement
);
router.put(
  "/documents/:id",
  upload.single("pdf"),
  updateOrganaization.updateDocument
);
router.put(
  "/updateCoverPicture/:id",
  upload.single("photo"),
  updateOrganaization.updateCoverPicture
);

router.post("/addImages/:id",upload.any(),addImages)
router.post("/addRecidence/:id",upload.single('photo'),addRecidence)








module.exports = router;
