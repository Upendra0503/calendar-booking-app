const { Op } = require("sequelize");
const Meeting = require("../model/meeting.model");

async function hasConflict(userId, startTime, endTime, excludeId = null) {
  return Meeting.findOne({
    where: {
      userId,
      ...(excludeId && { id: { [Op.ne]: excludeId } }),
      startTime: { [Op.lt]: endTime },
      endTime: { [Op.gt]: startTime },
    },
  });
}

async function createMeeting(data) {
  if (new Date(data.startTime) >= new Date(data.endTime)) {
    throw new Error("startTime must be before endTime");
  }

  const conflict = await hasConflict(
    data.userId,
    data.startTime,
    data.endTime
  );

  if (conflict) {
    throw new Error("Time slot already booked");
  }

  return Meeting.create(data);
}

async function getMeetings(query) {
  return Meeting.findAll({ where: query });
}

async function getMeetingById(id) {
  return Meeting.findByPk(id);
}

async function updateMeeting(id, data) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) return null;

  if (new Date(data.startTime) >= new Date(data.endTime)) {
    throw new Error("startTime must be before endTime");
  }

  const conflict = await hasConflict(
    data.userId,
    data.startTime,
    data.endTime,
    id
  );

  if (conflict) {
    throw new Error("Time slot already booked");
  }

  return meeting.update(data);
}

async function deleteMeeting(id) {
  const meeting = await Meeting.findByPk(id);
  if (!meeting) return null;
  await meeting.destroy();
  return true;
}

module.exports = {
  createMeeting,
  getMeetings,
  getMeetingById,
  updateMeeting,
  deleteMeeting,
};
