const express = require('express');
const { home, getDetails, setDetails} = require('../controllers/userControllers');
const router = express.Router();
const upload = require('../middleware/multer.js')

router.get("/", home)
router.post("/setdetails",upload.single("avatar"), setDetails)
router.post("/getdetails", getDetails)

module.exports = router;