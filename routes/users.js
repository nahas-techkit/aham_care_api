var express = require("express");
var router = express.Router();
var multer = require("multer")
const oldAgeHomes = require("../Controllers/user/oldageHome");
const orphanage = require("../Controllers/user/orphanges");
const donation = require("../Controllers/user/donation");
const post = require("../Controllers/user/social");
const eventDonation = require("../Controllers/user/eventDonation")
const Store = require("../Controllers/admin/store/store")
const events = require("../Controllers/admin/events/events")
const storeDonation = require ("../Controllers/user/storeDonation")
const mapLocation = require("../Controllers/map/getNearbyOrganaization")

// Multer Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/post");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
// Multer Setup


/* Get Organaization */
router.get("/oldageHome", oldAgeHomes.getAllOldageHome);
router.get("/orphanage", orphanage.getAllOrphanage);

/* Donation */
router.post("/donation", donation);

// Post
router.post("/post",upload.single("image"), post.addPost);
router.post("/reaction", post.reaction);
router.get("/post", post.getPosts);

// Event Donation
router.post("/eventDonation",eventDonation)
router.post("/storeDonation",storeDonation)

router.get("/store", Store.getAllStore)

// Event
router.get("/event", events.getAllEvents)

// Map Locations
router.post('/getMapLocaton',mapLocation)



module.exports = router;
