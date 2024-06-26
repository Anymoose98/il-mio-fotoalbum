const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/register&login.js");
const validator = require('../middlewares/validator.js');

// Register
router.post('/register',  register);

// Login
router.post('/login', login);

module.exports = router;