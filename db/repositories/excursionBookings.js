const { DbContext } = require("../dbContext");

function getExcursionBookings() {
    return DbContext.ExcursionBookingRecords.findAll();
}

function deleteExcursionBookings() {
    return DbContext.ExcursionBookingRecords.destroy({ truncate: true, });
}

function getExcursionBookingById(tId, sId) {
    return DbContext.ExcursionBookingRecords.findOne({
        where: {
            touristId: tId,
            scheduleId: sId
        }
    });
}

function deleteExcursionBookingById(tId, sId) {
    return DbContext.ExcursionBookingRecords.destroy({
        where: {
            touristId: tId,
            scheduleId: sId
        }
    });
}

function createExcursionBooking(body) {
    const excursionBooking = body;
    return DbContext.ExcursionBookingRecords.create(excursionBooking);
}

function updateExcursionBooking(tId, sId, body) {
    const excursionBooking = body;
    return DbContext.ExcursionBookingRecords.update(
        excursionBooking,
        {
            where: {
                touristId: tId,
                scheduleId: sId,
            }
        });
}

module.exports = {
    getExcursionBookings,
    getExcursionBookingById,
    createExcursionBooking,
    updateExcursionBooking,
    deleteExcursionBookings,
    deleteExcursionBookingById
};
