const { DbContext } = require("../dbContext");

function getTourists() {
  return DbContext.Tourists.findAll();
}

function deleteTourists() {
  return DbContext.Tourists.destroy({ truncate: true, });
}

function getTouristById(id) {
  return DbContext.Tourists.findByPk(id);
}

function deleteTouristById(id) {
  return DbContext.Tourists.destroy({ where: { touristId: id } });
}

function createTourist(body) {
  const tourist = body;
  return DbContext.Tourists.create(tourist);
}

function updateTourist(id, body) {
  const tourist = body;
  return DbContext.Tourists.update(tourist, { where: { touristId: id, } });
}

module.exports = {
  getTourists,
  getTouristById,
  createTourist,
  updateTourist,
  deleteTourists,
  deleteTouristById
};
