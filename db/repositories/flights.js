const { DbContext } = require("../dbContext");

function getFlights() {
    return DbContext.Flights.findAll();
}

function deleteFlights() {
    return DbContext.Flights.destroy({ truncate: true, });
}

function getFlightById(id) {
    return DbContext.Flights.findByPk(id);
}

function deleteFlightById(id) {
    return DbContext.Flights.destroy({ where: { flightId: id } });
}

function createFlight(body) {
    const flight = body;
    return DbContext.Flights.create(flight);
}

function updateFlight(id, body) {
    const flight = body;
    return DbContext.Flights.update(flight, { where: { flightId: id, } });
}

module.exports = {
    getFlights,
    getFlightById,
    createFlight,
    updateFlight,
    deleteFlights,
    deleteFlightById
};
