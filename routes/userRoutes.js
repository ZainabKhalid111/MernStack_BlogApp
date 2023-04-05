const express = require('express');
const { getAllUsers, loginUsers, registerUsers } = require('../controllers/userController');

// router object
const router = express.Router();

// get all users || Get
router.get("/all-users", getAllUsers);

// create users || post
router.post("/register", registerUsers);

// login || post
router.post("/login", loginUsers);

module.exports = router;