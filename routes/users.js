var express = require('express');
var router = express.Router();
const oldAgeHomes = require("../Controllers/user/oldageHome")
const orphanage = require("../Controllers/user/orphanges")

/* Oldage Homes */
router.get("/oldageHome",oldAgeHomes.getAllOldageHome)
router.get("/orphanage",orphanage.getAllOrphanage)


module.exports = router;
