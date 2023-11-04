const express = require('express');
const { home, getDetails, setDetails } = require('../controllers/userControllers');
const router = express.Router();

router.get("/", home)
router.post("/setdetails", setDetails)
router.post("/getdetails", getDetails)


module.exports = router;