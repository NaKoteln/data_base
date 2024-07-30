const { DbContext } = require("../dbContext");

function getTouristServices() {
  return DbContext.TouristServices.findAll();
}

function deleteTouristServices() {
  return DbContext.TouristServices.destroy({ truncate: true, });
}

function getTouristServiceById(id) {
  return DbContext.TouristServices.findByPk(id);
}

function deleteTouristServiceById(id) {
  return DbContext.TouristServices.destroy({ where: { recordId: id } });
}

function createTouristService(body) {
  const touristService = body;
  return DbContext.TouristServices.create(touristService);
}

function updateTouristService(id, body) {
  const touristService = body;
  return DbContext.TouristServices.update(touristService, { where: { recordId: id, } });
}

module.exports = {
  getTouristServices,
  getTouristServiceById,
  createTouristService,
  updateTouristService,
  deleteTouristServices,
  deleteTouristServiceById
};
