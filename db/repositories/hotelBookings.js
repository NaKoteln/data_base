const { DbContext } = require("../dbContext");

function getBookings() {
    return DbContext.HotelBookings.findAll();
}

function deleteBookings() {
    return DbContext.HotelBookings.destroy({ truncate: true, });
}

function getBookingById(id) {
    return DbContext.HotelBookings.findByPk(id);
}

function deleteBookingById(id) {
    return DbContext.HotelBookings.destroy({ where: { bookingId: id } });
}

function createBooking(body) {
    const booking = body;
    return DbContext.HotelBookings.create(booking);
}

function updateBooking(id, body) {
    const booking = body;
    return DbContext.HotelBookings.update(booking, { where: { bookingId: id, } });
}

module.exports = {
    getBookings,
    getBookingById,
    createBooking,
    updateBooking,
    deleteBookings,
    deleteBookingById
};
