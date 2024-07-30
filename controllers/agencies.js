const { body } = require("express-validator");
const { validate } = require("./utils");

const dbAgencies = require("../db/repositories/agencies");

async function getAgencies(req, res) {
  const result = await dbAgencies.getAgencies();
  res.send(result);
}

async function getAgencyById(req, res) {
  const result = await dbAgencies.getAgencyById(req.params.id);
  res.send(result);
}

const agencyValidators = [
  body("name").trim().notEmpty().withMessage("Введите название агенства"),
];

async function createAgency(req, res) {
  const result = await dbAgencies.createAgency(req.body);
  res.send(result);
}

async function updateAgency(req, res) {
  const result = await dbAgencies.updateAgency(req.params.id, req.body);
  res.send(result);
}

async function deleteAgencies(req, res) {
  const result = await dbAgencies.deleteAgencies();
  res.send({ res: result });
}

async function deleteAgencyById(req, res) {
  const result = await dbAgencies.deleteAgencyById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/agencies";
    app.get(path, getAgencies);
    app.get(`${path}/:id`, getAgencyById);
    app.post(path, validate(agencyValidators), createAgency);
    app.patch(`${path}/:id`, validate(agencyValidators), updateAgency);
    app.delete(path, deleteAgencies);
    app.delete(`${path}/:id`, deleteAgencyById);
  },
};
