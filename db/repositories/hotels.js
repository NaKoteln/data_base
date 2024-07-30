const { DbContext } = require("../dbContext");

function getHotels() {
  return DbContext.Hotels.findAll();
}

function deleteHotels() {
  return DbContext.Hotels.destroy({ truncate: true, });
}

function getHotelById(id) {
  return DbContext.Hotels.findByPk(id);
}

function deleteHotelById(id) {
  return DbContext.Hotels.destroy({ where: { hotelId: id } });
}

function createHotel(body) {
  const hotel = body;
  return DbContext.Hotels.create(hotel);
}

function updateHotel(id, body) {
  const hotel = body;
  return DbContext.Hotels.update(hotel, { where: { hotelId: id, } });
}

module.exports = {
  getHotels,
  getHotelById,
  createHotel,
  updateHotel,
  deleteHotels,
  deleteHotelById
};
