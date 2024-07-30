const { DbContext } = require("../dbContext");

function getPeoples() {
  return DbContext.Peoples.findAll();
}

function deletePeoples() {
  return DbContext.Peoples.destroy({ truncate: true, });
}

function getPeopleById(id) {
  return DbContext.Peoples.findByPk(id);
}

function deletePeopleById(id) {
  return DbContext.Peoples.destroy({ where: { peopleId: id } });
}

function createPeople(body) {
  const people = body;
  return DbContext.Peoples.create(people);
}

function updatePeople(id, body) {
  const people = body;
  return DbContext.Peoples.update(people, { where: { peopleId: id, } });
}

module.exports = {
  getPeoples,
  getPeopleById,
  createPeople,
  updatePeople,
  deletePeoples,
  deletePeopleById
};
