const { body } = require("express-validator");
const { validate } = require("./utils");

const dbServices = require("../db/repositories/Services");

async function getServices(req, res) {
  const result = await dbServices.getServices();
  res.send(result);
}

async function getServiceById(req, res) {
  const result = await dbServices.getServiceById(req.params.id);
  res.send(result);
}

const serviceValidators = [
  body("name").trim().notEmpty().withMessage("Поле Name должно быть заполнено"),
  body("cost").isInt().withMessage("Введите число"),
]

async function createService(req, res) {
  const result = await dbServices.createService(req.body);
  res.send(result);
}

async function deleteServices(req, res) {
  const result = await dbServices.deleteServices();
  res.send({ res: result });
}

async function deleteServiceById(req, res) {
  const result = await dbServices.deleteServiceById(req.params.id);
  res.send({ res: result });
}

async function getActualServices(req, res) {
  const result = await dbServices.getActualServices();
  res.send(result);
}

module.exports = {
  registerController: (app) => {
    const path = "/services";
    app.get(path, getServices);
    app.get(`${path}/actual`, getActualServices);
    app.get(`${path}/:id`, getServiceById);
    app.post(path, validate(serviceValidators), createService);
    app.delete(path, deleteServices);
    app.delete(`${path}/:id`, deleteServiceById);
  },
};
