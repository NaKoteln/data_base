const { body } = require("express-validator");
const { validate } = require("./utils");

const dbBookings = require("../db/repositories/hotelBookings");

async function getBookings(req, res) {
  const result = await dbBookings.getBookings();
  res.send(result);
}

async function getBookingById(req, res) {
  const result = await dbBookings.getBookingById(req.params.id);
  res.send(result);
}

const bookingValidators = [
  body("checkInDate").notEmpty().isISO8601().toDate().withMessage("Введите дату"),
  body("checkOutDate").notEmpty().custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.checkInDate)) {
      throw new Error('Дата выселения должна быть после даты заселения');
    }
    return true;
  })
];

async function createBooking(req, res) {
  const result = await dbBookings.createBooking(req.body);
  res.send(result);
}

async function updateBooking(req, res) {
  const result = await dbBookings.updateBooking(req.params.id, req.body);
  res.send(result);
}

async function deleteBookings(req, res) {
  const result = await dbBookings.deleteBookings();
  res.send({ res: result });
}

async function deleteBookingById(req, res) {
  const result = await dbBookings.deleteBookingById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/bookings";
    app.get(path, getBookings);
    app.get(`${path}/:id`, getBookingById);
    app.post(path, validate(bookingValidators), createBooking);
    app.patch(`${path}/:id`, validate(bookingValidators), updateBooking);
    app.delete(path, deleteBookings);
    app.delete(`${path}/:id`, deleteBookingById);
  },
};
