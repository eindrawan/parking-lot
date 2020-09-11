var express = require("express");
var router = express.Router();
const parkingLot = require("../controllers/parking-lot");

router.post("/park", parkingLot.park);
router.post("/unpark", parkingLot.unpark);
router.get("/info/:id", parkingLot.info);

module.exports = router;
