const { DbContext } = require("../dbContext");

function getExcursionSchedules() {
  return DbContext.ExcursionSchedules.findAll();
}

function deleteExcursionSchedules() {
  return DbContext.ExcursionSchedules.destroy({ truncate: true, });
}

function getExcursionScheduleById(id) {
  return DbContext.ExcursionSchedules.findByPk(id);
}

function deleteExcursionScheduleById(id) {
  return DbContext.ExcursionSchedules.destroy({ where: { scheduleId: id } });
}

function createExcursionSchedule(body) {
  const excursionSchedule = body;
  return DbContext.ExcursionSchedules.create(excursionSchedule);
}

function updateExcursionSchedule(id, body) {
  const excursionSchedule = body;
  return DbContext.ExcursionSchedules.update(excursionSchedule, { where: { scheduleId: id, } });
}

module.exports = {
  getExcursionSchedules,
  getExcursionScheduleById,
  createExcursionSchedule,
  updateExcursionSchedule,
  deleteExcursionSchedules,
  deleteExcursionScheduleById
};
