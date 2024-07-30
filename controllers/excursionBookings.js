const dbExcursionBookings = require("../db/repositories/excursionBookings");

async function getExcursionBookings(req, res) {
  const result = await dbExcursionBookings.getExcursionBookings();
  res.send(result);
}

async function getExcursionBookingById(req, res) {
  const result = await dbExcursionBookings.getExcursionBookingById(req.params.id1, req.params.id2);
  res.send(result);
}

async function createExcursionBooking(req, res) {
  const result = await dbExcursionBookings.createExcursionBooking(req.body);
  res.send(result);
}

async function updateExcursionBooking(req, res) {
  const result = await dbExcursionBookings.updateExcursionBooking(req.params.id1, req.params.id2, req.body);
  res.send(result);
}

async function deleteExcursionBookings(req, res) {
  const result = await dbExcursionBookings.deleteExcursionBookings();
  res.send({ res: result });
}

async function deleteExcursionBookingById(req, res) {
  const result = await dbExcursionBookings.deleteExcursionBookingById(req.params.id1, req.params.id2);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/excursionBookings";
    app.get(path, getExcursionBookings);
    app.get(`${path}/:id1/:id2`, getExcursionBookingById);
    app.post(path, createExcursionBooking);
    app.patch(`${path}/:id1/:id2`, updateExcursionBooking);
    app.delete(path, deleteExcursionBookings);
    app.delete(`${path}/:id1/:id2`, deleteExcursionBookingById);
  },
};
