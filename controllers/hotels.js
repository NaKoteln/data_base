const { body } = require("express-validator");
const { validate } = require("./utils");

const dbHotels = require("../db/repositories/hotels");

async function getHotels(req, res) {
  const result = await dbHotels.getHotels();
  res.send(result);
}

async function getHotelById(req, res) {
  const result = await dbHotels.getHotelById(req.params.id);
  res.send(result);
}

const hotelValidators = [
  body("name").trim().notEmpty().withMessage("Введите название отеля"),
  body("nightCost").isInt({ gt: 50 }).withMessage("Введите число больше 50"),
];

async function createHotel(req, res) {
  const result = await dbHotels.createHotel(req.body);
  res.send(result);
}

async function updateHotel(req, res) {
  const result = await dbHotels.updateHotel(req.params.id, req.body);
  res.send(result);
}

async function deleteHotels(req, res) {
  const result = await dbHotels.deleteHotels();
  res.send({ res: result });
}

async function deleteHotelById(req, res) {
  const result = await dbHotels.deleteHotelById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/hotels";
    app.get(path, getHotels);
    app.get(`${path}/:id`, getHotelById);
    app.post(path, validate(hotelValidators), createHotel);
    app.patch(`${path}/:id`, validate(hotelValidators),updateHotel);
    app.delete(path, deleteHotels);
    app.delete(`${path}/:id`, deleteHotelById);
  },
};
