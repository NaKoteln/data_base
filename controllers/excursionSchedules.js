const { body } = require("express-validator");
const { validate } = require("./utils");

const dbExcursionSchedules = require("../db/repositories/excursionSchedules");

async function getExcursionSchedules(req, res) {
  const result = await dbExcursionSchedules.getExcursionSchedules();
  res.send(result);
}

async function getExcursionScheduleById(req, res) {
  const result = await dbExcursionSchedules.getExcursionScheduleById(req.params.id);
  res.send(result);
}

const scheduleValidators = [
  body("excursionDate").notEmpty().isISO8601().toDate().withMessage("Введите дату экскурсии"),
  body("startTime").notEmpty().isTime({ hourFormat: 'hour24' }).withMessage("Введите время начала"),
  body("endTime").notEmpty().custom((value, { req }) => {
    if ((value.split(':')[0] < req.body.startTime.split(':')[0]) ||
      (value.split(':')[0] == req.body.startTime.split(':')[0] && value.split(':')[1] <= req.body.startTime.split(':')[1])) {
      throw new Error('Время окончания экскурсии должно быть после начала');
    }
    return true;
  })
];

async function createExcursionSchedule(req, res) {
  const result = await dbExcursionSchedules.createExcursionSchedule(req.body);
  res.send(result);
}

async function updateExcursionSchedule(req, res) {
  const result = await dbExcursionSchedules.updateExcursionSchedule(req.params.id, req.body);
  res.send(result);
}

async function deleteExcursionSchedules(req, res) {
  const result = await dbExcursionSchedules.deleteExcursionSchedules();
  res.send({ res: result });
}

async function deleteExcursionScheduleById(req, res) {
  const result = await dbExcursionSchedules.deleteExcursionScheduleById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/excursionSchedules";
    app.get(path, getExcursionSchedules);
    app.get(`${path}/:id`, getExcursionScheduleById);
    app.post(path, validate(scheduleValidators), createExcursionSchedule);
    app.patch(`${path}/:id`, validate(scheduleValidators), updateExcursionSchedule);
    app.delete(path, deleteExcursionSchedules);
    app.delete(`${path}/:id`, deleteExcursionScheduleById);
  },
};
