const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/authController");

// Login Route
router.post("/login", login);

// Student Registration Route
router.post("/register", register);

module.exports = router;
