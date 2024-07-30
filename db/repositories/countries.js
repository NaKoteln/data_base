const { DbContext } = require("../dbContext");

function getCountries() {
  return DbContext.Countries.findAll();
}

function deleteCountries() {
  return DbContext.Countries.destroy({ truncate: true, });
}

function getCountryById(id) {
  return DbContext.Countries.findByPk(id);
}

function deleteCountryById(id) {
  return DbContext.Countries.destroy({ where: { countryId: id } });
}

function createCountry(body) {
  const country = body;
  return DbContext.Countries.create(country);
}

function updateCountry(id, body) {
  const Country = body;
  return DbContext.Countries.update(Country, { where: { countryId: id, } });

}

module.exports = {
  getCountries,
  getCountryById,
  createCountry,
  updateCountry,
  deleteCountries,
  deleteCountryById
};
