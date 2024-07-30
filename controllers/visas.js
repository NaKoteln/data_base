const { body } = require("express-validator");
const { validate } = require("./utils");

const dbVisas = require("../db/repositories/visas");

async function getVisas(req, res) {
  const result = await dbVisas.getVisas();
  res.send(result);
}

async function getVisaById(req, res) {
  const result = await dbVisas.getVisaById(req.params.id);
  res.send(result);
}

const visaValidators = [
  body("issueDate").notEmpty().isISO8601().toDate().withMessage("Введите дату"),
  body("expirationDate").notEmpty().custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.issueDate)) {
      throw new Error('Дата окончания должна быть после даты выдачи');
    }
    return true;
  }),
  body("country").trim().notEmpty().isString().withMessage("Введите название страны"),
];

async function createVisa(req, res) {
  const result = await dbVisas.createVisa(req.body);
  res.send(result);
}

async function updateVisa(req, res) {
  const result = await dbVisas.updateVisa(req.params.id, req.body);
  res.send(result);
}

async function deleteVisas(req, res) {
  const result = await dbVisas.deleteVisas();
  res.send({ res: result });
}

async function deleteVisaById(req, res) {
  const result = await dbVisas.deleteVisaById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/visas";
    app.get(path, getVisas);
    app.get(`${path}/:id`, getVisaById);
    app.post(path, validate(visaValidators), createVisa);
    app.patch(`${path}/:id`, validate(visaValidators), updateVisa);
    app.delete(path, deleteVisas);
    app.delete(`${path}/:id`, deleteVisaById);
  },
};
