const express = require("express");

const protect = require("../../middleware/auth.middleware");

const {
  getProfile
} = require("../../controllers/user.controller");

const router = express.Router();

router.get("/me", protect, getProfile);

module.exports = router;