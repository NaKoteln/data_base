const { body } = require("express-validator");
const { validate } = require("./utils");

const dbFlights = require("../db/repositories/flights");

async function getFlights(req, res) {
  const result = await dbFlights.getFlights();
  res.send(result);
}

async function getFlightById(req, res) {
  const result = await dbFlights.getFlightById(req.params.id);
  res.send(result);
}

const flightValidator = [
  body("seatsNumber").isInt({ gt: -1, lt: 301 }).withMessage("Введите число от 0 до 300"),
  body("cargoSeats").isInt({ gt: -1, lt: 501 }).withMessage("Введите число от 0 до 500"),
]

async function createFlight(req, res) {
  const result = await dbFlights.createFlight(req.body);
  res.send(result);
}

async function updateFlight(req, res) {
  const result = await dbFlights.updateFlight(req.params.id, req.body);
  res.send(result);
}

async function deleteFlights(req, res) {
  const result = await dbFlights.deleteFlights();
  res.send({ res: result });
}

async function deleteFlightById(req, res) {
  const result = await dbFlights.deleteFlightById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/flights";
    app.get(path, getFlights);
    app.get(`${path}/:id`, getFlightById);
    app.post(path, validate(flightValidator), createFlight);
    app.patch(`${path}/:id`, validate(flightValidator), updateFlight);
    app.delete(path, deleteFlights);
    app.delete(`${path}/:id`, deleteFlightById);
  },
};
