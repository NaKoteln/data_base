const { body } = require("express-validator");
const { validate } = require("./utils");

const dbFeedbacks = require("../db/repositories/feedbacks");

async function getFeedbacks(req, res) {
  const result = await dbFeedbacks.getFeedbacks();
  res.send(result);
}

async function getFeedbackById(req, res) {
  const result = await dbFeedbacks.getFeedbackById(req.params.id);
  res.send(result);
}

const feedbackValidators = [
  body("estimation").isInt({ gt: -1, lt: 6 }).withMessage("Введите оценку от 0 до 5"),
  body("description").trim().isString(),
]

async function createFeedback(req, res) {
  const result = await dbFeedbacks.createFeedback(req.body);
  res.send(result);
}

async function updateFeedback(req, res) {
  const result = await dbFeedbacks.updateFeedback(req.params.id, req.body);
  res.send(result);
}

async function deleteFeedbacks(req, res) {
  const result = await dbFeedbacks.deleteFeedbacks();
  res.send({ res: result });
}

async function deleteFeedbackById(req, res) {
  const result = await dbFeedbacks.deleteFeedbackById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/feedbacks";
    app.get(path, getFeedbacks);
    app.get(`${path}/:id`, getFeedbackById);
    app.post(path, validate(feedbackValidators), createFeedback);
    app.patch(`${path}/:id`, validate(feedbackValidators), updateFeedback);
    app.delete(path, deleteFeedbacks);
    app.delete(`${path}/:id`, deleteFeedbackById);
  },
};
