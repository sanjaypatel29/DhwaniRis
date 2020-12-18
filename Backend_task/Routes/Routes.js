const express = require("express");
const { poststateData, getAllstate, postDistrict, getAllDistrict, postChild, getChild } = require("../Controllers/stateDataControllers")
const router = express.Router();

router.post("/api/addState", poststateData)
router.get("/api/state", getAllstate)

router.post("/api/addDistrict/:stateName", postDistrict)
router.get("/api/district/:stateName", getAllDistrict)

router.post("/api/addChild", postChild)
router.get("/api/child", getChild)

module.exports = router