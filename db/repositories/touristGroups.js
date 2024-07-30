const { DbContext } = require("../dbContext");

function getGroups() {
  return DbContext.TouristGroups.findAll();
}

function deleteGroups() {
  return DbContext.TouristGroups.destroy({ truncate: true, });
}

function getGroupById(id) {
  return DbContext.TouristGroups.findByPk(id);
}

function deleteGroupById(id) {
  return DbContext.TouristGroups.destroy({ where: { groupId: id } });
}

function createGroup(body) {
  const group = body;
  return DbContext.TouristGroups.create(group);
}

function updateGroup(id, body) {
  const group = body;
  return DbContext.TouristGroups.update(group, { where: { groupId: id, } });
}

module.exports = {
  getGroups,
  getGroupById,
  createGroup,
  updateGroup,
  deleteGroups,
  deleteGroupById
};
