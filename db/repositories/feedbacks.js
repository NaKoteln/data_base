const { DbContext } = require("../dbContext");

function getFeedbacks() {
  return DbContext.Feedbacks.findAll();
}

function deleteFeedbacks() {
  return DbContext.Feedbacks.destroy({ truncate: true, });
}

function getFeedbackById(id) {
  return DbContext.Feedbacks.findByPk(id);
}

function deleteFeedbackById(id) {
  return DbContext.Feedbacks.destroy({ where: { recordId: id } });
}

function createFeedback(body) {
  const feedback = body;
  return DbContext.Feedbacks.create(feedback);
}

function updateFeedback(id, body) {
  const feedback = body;
  return DbContext.Feedbacks.update(feedback, { where: { recordId: id, } });
}

module.exports = {
  getFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedbacks,
  deleteFeedbackById
};
