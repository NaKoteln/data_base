const { DbContext } = require("../dbContext");

function getAgencies() {
  return DbContext.Agencies.findAll();
}

function deleteAgencies() {
  return DbContext.Agencies.destroy({ truncate: true, });
}

function getAgencyById(id) {
  return DbContext.Agencies.findByPk(id);
}

function deleteAgencyById(id) {
  return DbContext.Agencies.destroy({ where: { agencyId: id } });
}

function createAgency(body) {
  const agency = body;
  return DbContext.Agencies.create(agency);
}

function updateAgency(id, body) {
  const agency = body;
  return DbContext.Agencies.update(agency, { where: { agencyId: id, } });

}

module.exports = {
  getAgencies,
  getAgencyById,
  createAgency,
  updateAgency,
  deleteAgencies,
  deleteAgencyById
};
