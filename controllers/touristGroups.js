const { body } = require("express-validator");
const { validate } = require("./utils");

const dbGroups = require("../db/repositories/touristGroups");

async function getGroups(req, res) {
  const result = await dbGroups.getGroups();
  res.send(result);
}

async function getGroupById(req, res) {
  const result = await dbGroups.getGroupById(req.params.id);
  res.send(result);
}

const groupValidators = [
  body("name").trim().notEmpty().withMessage("Введите название группы"),
  body("checkInDate").notEmpty().isISO8601().toDate().withMessage("Введите дату"),
  body("checkOutDate").notEmpty().custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.checkInDate)) {
      throw new Error('Дата отъезда должна быть после даты прибытия');
    }
    return true;
  })
];

async function createGroup(req, res) {
  const result = await dbGroups.createGroup(req.body);
  res.send(result);
}

async function updateGroup(req, res) {
  const result = await dbGroups.updateGroup(req.params.id, req.body);
  res.send(result);
}

async function deleteGroups(req, res) {
  const result = await dbGroups.deleteGroups();
  res.send({ res: result });
}

async function deleteGroupById(req, res) {
  const result = await dbGroups.deleteGroupById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/groups";
    app.get(path, getGroups);
    app.get(`${path}/:id`, getGroupById);
    app.post(path, validate(groupValidators), createGroup);
    app.patch(`${path}/:id`, validate(groupValidators), updateGroup);
    app.delete(path, deleteGroups);
    app.delete(`${path}/:id`, deleteGroupById);
  },
};
