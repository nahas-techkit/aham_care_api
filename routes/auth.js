const express = require("express");
const router = express.Router();
const Auth = require("../Controllers/Auth/register")
const regenerateToken = require("../Controllers/Auth/regenerateToken")

router.post("/register",Auth.register)
router.post("/login",Auth.login)
router.post("/getOtp", Auth.getOtp)
router.post("/verifyOtp",Auth.verifyOtp)
router.post("/regenerate-token", regenerateToken)

module.exports = router;