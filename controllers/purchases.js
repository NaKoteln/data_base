const { body } = require("express-validator");
const { validate } = require("./utils");

const dbPurchases = require("../db/repositories/purchases");

async function getPurchases(req, res) {
  const result = await dbPurchases.getPurchases();
  res.send(result);
}

async function getPurchaseById(req, res) {
  const result = await dbPurchases.getPurchaseById(req.params.id);
  res.send(result);
}

const purchaseValidators = [
  body("count").isInt({ gt: -1, lt: 10000 }).withMessage("Введите число от 0 до 10000"),
]

async function createPurchase(req, res) {
  const result = await dbPurchases.createPurchase(req.body);
  res.send(result);
}

async function updatePurchase(req, res) {
  const result = await dbPurchases.updatePurchase(req.params.id, req.body);
  res.send(result);
}

async function deletePurchases(req, res) {
  const result = await dbPurchases.deletePurchases();
  res.send({ res: result });
}

async function deletePurchaseById(req, res) {
  const result = await dbPurchases.deletePurchaseById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/purchases";
    app.get(path, getPurchases);
    app.get(`${path}/:id`, getPurchaseById);
    app.post(path, validate(purchaseValidators), createPurchase);
    app.patch(`${path}/:id`, validate(purchaseValidators), updatePurchase);
    app.delete(path, deletePurchases);
    app.delete(`${path}/:id`, deletePurchaseById);
  },
};
