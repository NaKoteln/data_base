const { body } = require("express-validator");
const { validate } = require("./utils");

const dbFlightSchedules = require("../db/repositories/flightSchedules");

async function getFlightSchedules(req, res) {
  const result = await dbFlightSchedules.getFlightSchedules();
  res.send(result);
}

async function getFlightScheduleById(req, res) {
  const result = await dbFlightSchedules.getFlightScheduleById(req.params.id);
  res.send(result);
}

const scheduleValidators = [
  body("date").notEmpty().isISO8601().toDate().withMessage("Введите дату"),
  body("flightType").notEmpty().isIn(['departure', 'arrival']).withMessage("Выберите тип полётаЖ arrival/departure"),
];

async function createFlightSchedule(req, res) {
  const result = await dbFlightSchedules.createFlightSchedule(req.body);
  res.send(result);
}

async function updateFlightSchedule(req, res) {
  const result = await dbFlightSchedules.updateFlightSchedule(req.params.id, req.body);
  res.send(result);
}

async function deleteFlightSchedules(req, res) {
  const result = await dbFlightSchedules.deleteFlightSchedules();
  res.send({ res: result });
}

async function deleteFlightScheduleById(req, res) {
  const result = await dbFlightSchedules.deleteFlightScheduleById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/flightSchedules";
    app.get(path, getFlightSchedules);
    app.get(`${path}/:id`, getFlightScheduleById);
    app.post(path, validate(scheduleValidators), createFlightSchedule);
    app.patch(`${path}/:id`, validate(scheduleValidators), updateFlightSchedule);
    app.delete(`${path}/:id`, deleteFlightScheduleById);
    app.delete(path, deleteFlightSchedules);
  },
};
