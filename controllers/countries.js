const { body } = require("express-validator");
const { validate } = require("./utils");

const dbCountries = require("../db/repositories/Countries");

async function getCountries(req, res) {
  const result = await dbCountries.getCountries();
  res.send(result);
}

async function getCountryById(req, res) {
  const result = await dbCountries.getCountryById(req.params.id);
  res.send(result);
}

const countryValidators = [
  body("name").trim().notEmpty().withMessage("Введите название страны"),
];

async function createCountry(req, res) {
  const result = await dbCountries.createCountry(req.body);
  res.send(result);
}

async function updateCountry(req, res) {
  const result = await dbCountries.updateCountry(req.params.id, req.body);
  res.send(result);
}

async function deleteCountries(req, res) {
  const result = await dbCountries.deleteCountries();
  res.send({ res: result });
}

async function deleteCountryById(req, res) {
  const result = await dbCountries.deleteCountryById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/countries";
    app.get(path, getCountries);
    app.get(`${path}/:id`, getCountryById);
    app.post(path, validate(countryValidators), createCountry);
    app.patch(`${path}/:id`, validate(countryValidators), updateCountry);
    app.delete(path, deleteCountries);
    app.delete(`${path}/:id`, deleteCountryById);
  },
};
