const { body } = require("express-validator");
const { validate } = require("./utils");

const dbExcursions = require("../db/repositories/excursions");

async function getExcursions(req, res) {
  const result = await dbExcursions.getExcursions();
  res.send(result);
}

async function getExcursionById(req, res) {
  const result = await dbExcursions.getExcursionById(req.params.id);
  res.send(result);
}

const excursionValidators = [
  body("name").trim().notEmpty().withMessage("Введите название экскурсии"),
  body("cost").isInt({ gt: -1 }).withMessage("Введите стоимость экскурсии"),
  body("maximumPeople").isInt({ gt: 0, lt: 101 }).withMessage("Укажите число от 1 до 100"),
]

async function createExcursion(req, res) {
  const result = await dbExcursions.createExcursion(req.body);
  res.send(result);
}

async function updateExcursion(req, res) {
  const result = await dbExcursions.updateExcursion(req.params.id, req.body);
  res.send(result);
}

async function deleteExcursions(req, res) {
  const result = await dbExcursions.deleteExcursions();
  res.send({ res: result });
}

async function deleteExcursionById(req, res) {
  const result = await dbExcursions.deleteExcursionById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/excursions";
    app.get(path, getExcursions);
    app.get(`${path}/:id`, getExcursionById);
    app.post(path, validate(excursionValidators), createExcursion);
    app.patch(`${path}/:id`, validate(excursionValidators), updateExcursion);
    app.delete(path, deleteExcursions);
    app.delete(`${path}/:id`, deleteExcursionById);
  },
};
