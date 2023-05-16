const express = require("express");
const router = express.Router();
const Auth = require("../Controllers/Auth/register")
const AdminAuth = require("../Controllers/Auth/admin")
const regenerateToken = require("../Controllers/Auth/regenerateToken")

router.post("/register",Auth.register)
router.post("/login",Auth.login)
router.post("/getOtp", Auth.getOtp)
router.post("/verifyOtp",Auth.verifyOtp)
router.post("/regenerate-token", regenerateToken)

router.post("/admin-register", AdminAuth.register)
router.post('/admin-login', AdminAuth.login)

module.exports = router;