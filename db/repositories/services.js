const { where } = require("sequelize");
const { DbContext } = require("../dbContext");

function getServices() {
  return DbContext.Services.findAll();
}

function deleteServices() {
  return DbContext.Services.update({ isDeleted: true, }, { where: {} });
}

function getServiceById(id) {
  return DbContext.Services.findByPk(id);
}

function deleteServiceById(id) {
  return DbContext.Services.update({ isDeleted: true }, { where: { serviceId: id } });
}

function createService(body) {
  const Service = body;
  return DbContext.Services.create(Service);
}

function getActualServices() {
  return DbContext.Services.findAll({ where: { isDeleted: false } });
}

module.exports = {
  getServices,
  getServiceById,
  getActualServices,
  createService,
  deleteServices,
  deleteServiceById
};
