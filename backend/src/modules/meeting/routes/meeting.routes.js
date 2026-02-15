const express = require("express");
const router = express.Router();
const controller = require("../interface/meeting.controller");

router.post("/", controller.createMeeting);
router.get("/", controller.getMeetings);
router.get("/:id", controller.getMeeting);
router.put("/:id", controller.updateMeeting);
router.delete("/:id", controller.deleteMeeting);

module.exports = router;
