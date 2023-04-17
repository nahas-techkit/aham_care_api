const express = require("express");
const router = express.Router();
const createOldage = require("../Controllers/admin/organaization/createOrganaization");
const addImages = require("../Controllers/admin/organaization/addImages");
const addRecidence = require("../Controllers/admin/organaization/addRecience");
const updateOrganaization = require("../Controllers/admin/organaization/updateOrgnaization");
const Store = require("../Controllers/admin/store/store");
const events = require("../Controllers/admin/events/events");
const oldageHome = require("../Controllers/user/oldageHome");
const orphange = require("../Controllers/user/orphanges");
<<<<<<< HEAD
const storeDonations = require("../Controllers/admin/store/storeDonation");
const eventDonations = require("../Controllers/admin/events/eventDonation");
const orders = require('../Controllers/admin/orders/orders')
const division = require ('../Controllers/admin/organaization/division/division')
const organaization = require ('../Controllers/admin/organaization/division/organization')
=======
const OrganizationType = require("../Controllers/admin/organization-type");
>>>>>>> 85860a55941b0d3b13a2817ac5bf86715236efc3

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

router.post("/addImages/:id", upload.any(), addImages);
router.post("/addRecidence/:id", upload.single("photo"), addRecidence);
router.get("/getOldageHome", oldageHome.getAllOldageHome);
router.get("/getOldageHome/:id", oldageHome.getOldageHomeById);
router.get("/orphange", orphange.getAllOrphanage);
router.get("/orphange/:id", orphange.getOrphangeById);

// Store
<<<<<<< HEAD
router.post("/store", upload.single("photo"), Store.createStore);
=======
router.post("/store", Store.createStore);
>>>>>>> 85860a55941b0d3b13a2817ac5bf86715236efc3
router.put("/editStore/:id", Store.editStore);
router.put("/deleteStore/:id", Store.deleteStore);
router.get("/store", Store.getAllStore);
router.get("/store/:id", Store.getStoreById);

// Store Donations
router.get("/donations/:storeId", Store.getStoreDonations);
router.patch("/status/:storeId", Store.changeStoreStatus);
router.delete("/store-donation/:id", Store.deleteStoreDonation);
<<<<<<< HEAD
router.get("/storeDonationById/:id", storeDonations.getStoreDonationById);
=======
>>>>>>> 85860a55941b0d3b13a2817ac5bf86715236efc3

// Events
router.post("/event", events.createEvent);
router.put("/editEvent/:id", events.editEvent);
router.patch("/eventStatus/:id", events.changeStatus);
router.patch("/deleteEvent/:id", events.deleteEvent);
router.get("/event", events.getAllEvents);
router.get("/event/:id", events.getEventById);
<<<<<<< HEAD

// Event Donatios
router.get("/eventDonation/:eventId", events.getEventDonations);
router.get("/eventDonationById/:id", eventDonations.getEventDonationById);

// Orders Org
router.get('/organizationOrders', orders.getAllOrgOrders)
router.get('/organizationOrderById/:id', orders.getOrgOrderById)

// Store orders
router.get('/storeOrders', orders.getAllstoreOrders )

// Event Orders
router.get('/eventOrders', orders.getAllEventOrders)


// Divisions
router.post('/createDivision',division.createDivison)
router.get('/division',division.getAllDivision)

// Organization 
router.get('/organaizatioByType/:typeId',organaization.getOrgnaizationByType)
=======

// OrganizationType
router
  .route("/org-type")
  .post(OrganizationType.create)
  .get(OrganizationType.list);
router.patch("/org-type/status/:id", OrganizationType.toggleStatus);
>>>>>>> 85860a55941b0d3b13a2817ac5bf86715236efc3

module.exports = router;
