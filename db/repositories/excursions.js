const { DbContext } = require("../dbContext");

function getExcursions() {
  return DbContext.Excursions.findAll();
}

function deleteExcursions() {
  return DbContext.Excursions.destroy({ truncate: true, });
}

function getExcursionById(id) {
  return DbContext.Excursions.findByPk(id);
}

function deleteExcursionById(id) {
  return DbContext.Excursions.destroy({ where: { excursionId: id } });
}

function createExcursion(body) {
  const excursion = body;
  // const {agencyId, name, cost, maximumPeople} = body;
  // const result = DbContext.Excursions.create({ agencyId, name, cost, maximumPeople});
  return DbContext.Excursions.create(excursion);
}

function updateExcursion(id, body) {
  const excursion = body;
  return DbContext.Excursions.update(excursion, { where: { excursionId: id, } });
}

module.exports = {
  getExcursions,
  getExcursionById,
  createExcursion,
  updateExcursion,
  deleteExcursions,
  deleteExcursionById
};
