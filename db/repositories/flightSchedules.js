const { DbContext } = require("../dbContext");

function getFlightSchedules() {
    return DbContext.FlightsSchedules.findAll();
}

function deleteFlightSchedules() {
    return DbContext.FlightsSchedules.destroy({ truncate: true, });
}

function getFlightScheduleById(id) {
    return DbContext.FlightsSchedules.findByPk(id);
}

function deleteFlightScheduleById(id) {
    return DbContext.FlightsSchedules.destroy({ where: { scheduleId: id } });
}

function createFlightSchedule(body) {
    const flightSchedule = body;
    return DbContext.FlightsSchedules.create(flightSchedule);
}

function updateFlightSchedule(id, body) {
    const flightSchedule = body;
    return DbContext.FlightsSchedules.update(flightSchedule, { where: { scheduleId: id, } });
}
module.exports = {
    getFlightSchedules,
    getFlightScheduleById,
    createFlightSchedule,
    updateFlightSchedule,
    deleteFlightSchedules,
    deleteFlightScheduleById
};
