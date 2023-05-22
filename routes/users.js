var express = require("express");
var router = express.Router();
var multer = require("multer");
const oldAgeHomes = require("../Controllers/user/oldageHome");
const orphanage = require("../Controllers/user/orphanges");
const donation = require("../Controllers/user/donation");
const post = require("../Controllers/user/social");
const eventDonation = require("../Controllers/user/eventDonation");
const Store = require("../Controllers/admin/store/store");
const events = require("../Controllers/admin/events/events");
const storeDonation = require("../Controllers/user/storeDonation");
const mapLocation = require("../Controllers/map/getNearbyOrganaization");
const panCard = require("../Controllers/pancard/pancard");
const user = require("../Controllers/user/profile");
const {authenticateToken} = require('../utils/JWT')



// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === "image") {
      cb(null, "public/uploads/post");
    } else {
      cb(null, "public/uploads/profile");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

/* ============================================================== */
// V2
const division = require('../Controllers/user/division')
const Organaization = require('../Controllers/user/organaization')


/* Get Organaization */
router.get("/oldageHome", oldAgeHomes.getAllOldageHome);
router.get("/orphanage", orphanage.getAllOrphanage);

/* Donation */
router.post("/donation", donation);
// router.post("/donation", donation);

// Social Post
router.post("/post", upload.single("image"), post.addPost);
router.post("/reaction", post.reaction);
router.get("/post", post.getPosts);

// Event and Store Donation
router.post("/eventDonation", eventDonation);
router.post("/storeDonation", storeDonation);

// Store
router.get("/store", Store.getAllStore);

// Event
router.get("/event", events.getAllEvents);

// Map Locations
router.post("/getMapLocaton", mapLocation);

// PAN Card Varification
router.get("/pancard", panCard);

// User Profile
router.get("/user/:id", user.getProfileById);
router.put("/user/:id", user.editProfile);
router.patch(
  "/userProfile/:id",
  upload.single("profilePicture"),
  user.addProfilePicture
);
router.get('/getDonations/:id', user.getDonations)

// Division 
router.get('/allDivision',division.getAllDivision )

// get All Organizations By Division Id
router.get('/organizations/:typeId',Organaization.getAllorganaization )
router.get('/organizationsById/:orgId',Organaization.getOrganaizationById )





module.exports = router;
