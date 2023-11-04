const express = require('express');
const { home } = require('../controllers/userControllers');
const router = express.Router();

router.get("/", home)


module.exports = router;