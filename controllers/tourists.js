const { body } = require("express-validator");
const { validate } = require("./utils");

const dbTourists = require("../db/repositories/tourists");

async function getTourists(req, res) {
  const result = await dbTourists.getTourists();
  res.send(result);
}

async function getTouristById(req, res) {
  const result = await dbTourists.getTouristById(req.params.id);
  res.send(result);
}

const touristValidators = [
  body("category").trim().notEmpty().isIn(["child", "shop", "rest"]).withMessage("Выберите существующую категорию"),
];

async function createTourist(req, res) {
  const result = await dbTourists.createTourist(req.body);
  res.send(result);
}

async function updateTourist(req, res) {
  const result = await dbTourists.updateTourist(req.params.id, req.body);
  res.send(result);
}

async function deleteTourists(req, res) {
  const result = await dbTourists.deleteTourists();
  res.send({ res: result });
}

async function deleteTouristById(req, res) {
  const result = await dbTourists.deleteTouristById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/tourists";
    app.get(path, getTourists);
    app.get(`${path}/:id`, getTouristById);
    app.post(path, validate(touristValidators), createTourist);
    app.patch(`${path}/:id`, validate(touristValidators), updateTourist);
    app.delete(path, deleteTourists);
    app.delete(`${path}/:id`, deleteTouristById);
  },
};
