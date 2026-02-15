const service = require("../service/meeting.service");

async function createMeeting(req, res) {
  try {
    const meeting = await service.createMeeting(req.body);
    res.status(201).json(meeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function getMeetings(req, res) {
  const meetings = await service.getMeetings(req.query);
  res.status(200).json(meetings);
}

async function getMeeting(req, res) {
  const meeting = await service.getMeetingById(req.params.id);
  if (!meeting)
    return res.status(404).json({ message: "Meeting not found" });
  res.status(200).json(meeting);
}

async function updateMeeting(req, res) {
  try {
    const meeting = await service.updateMeeting(
      req.params.id,
      req.body
    );
    if (!meeting)
      return res.status(404).json({ message: "Meeting not found" });
    res.status(200).json(meeting);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

async function deleteMeeting(req, res) {
  const deleted = await service.deleteMeeting(req.params.id);
  if (!deleted)
    return res.status(404).json({ message: "Meeting not found" });
  res.status(204).send();
}

module.exports = {
  createMeeting,
  getMeetings,
  getMeeting,
  updateMeeting,
  deleteMeeting,
};
