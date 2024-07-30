const { body } = require("express-validator");
const dbPeoples = require("../db/repositories/peoples");
const { validate } = require("./utils");

async function getPeoples(req, res) {
  const result = await dbPeoples.getPeoples();
  res.send(result);
}

async function getPeopleById(req, res) {
  const result = await dbPeoples.getPeopleById(req.params.id);
  res.send(result);
}

const peopleValidators = [
  body("lastName").trim().isString().notEmpty().withMessage("Введите фамилию"),
  body("firstName").trim().isString().notEmpty().withMessage("Введите имя"),
  body("middleName").trim().isString().withMessage("Введите отчество"),
  body("passportData").isInt({ gt: 99999, lt: 1000000 }).withMessage("Паспортные данные в виде XXXXXX"),
  body("gender").isBoolean().notEmpty().withMessage("Выберите пол м/ж"),
];

async function createPeople(req, res) {
  const result = await dbPeoples.createPeople(req.body);
  res.send(result);
}

async function updatePeople(req, res) {
  const result = await dbPeoples.updatePeople(req.params.id, req.body);
  res.send(result);
}

async function deletePeoples(req, res) {
  const result = await dbPeoples.deletePeoples();
  res.send({ res: result });
}

async function deletePeopleById(req, res) {
  const result = await dbPeoples.deletePeopleById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/peoples";
    app.get(path, getPeoples);
    app.get(`${path}/:id`, getPeopleById);
    app.post(path, validate(peopleValidators), createPeople);
    app.patch(`${path}/:id`, validate(peopleValidators), updatePeople);
    app.delete(path, deletePeoples);
    app.delete(`${path}/:id`, deletePeopleById);
  },
};
