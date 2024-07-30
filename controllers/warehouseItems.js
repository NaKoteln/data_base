const { body } = require("express-validator");
const { validate } = require("./utils");

const dbWarehouses = require("../db/repositories/warehouseItems");

async function getWarehouses(req, res) {
  const result = await dbWarehouses.getWarehouses();
  res.send(result);
}

async function getWarehouseById(req, res) {
  const result = await dbWarehouses.getWarehouseById(req.params.id);
  res.send(result);
}

const itemValidators = [
  body("name").trim().notEmpty().withMessage("Введите название товара"),
  body("placeNumber").isInt({ gt: -1, lt: 300 }).withMessage("Введите число от 0 до 300"),
  body("cost").isInt({ gt: -1, lt: 300000 }).withMessage("Введите число от 0 до 300000"),
  body("insuranceCost").isInt({ gt: -1, lt: 30000 }).withMessage("Введите число от 0 до 30000"),
  body("packagingCost").isInt({ gt: -1, lt: 30000 }).withMessage("Введите число от 0 до 30000"),
  body("receiptDate").notEmpty().isISO8601().toDate().withMessage("Введите дату"),
  body("unloadingDate").notEmpty().custom((value, { req }) => {
    if (new Date(value) <= new Date(req.body.checkInDate)) {
      throw new Error('Дата выгрузки должна быть позже даты загрузки');
    }
    return true;
  })
]

async function createWarehouse(req, res) {
  const result = await dbWarehouses.createWarehouse(req.body);
  res.send(result);
}

async function updateWarehouse(req, res) {
  const result = await dbWarehouses.updateWarehouse(req.params.id, req.body);
  res.send(result);
}

async function deleteWarehouses(req, res) {
  const result = await dbWarehouses.deleteWarehouses();
  res.send({ res: result });
}

async function deleteWarehouseById(req, res) {
  const result = await dbWarehouses.deleteWarehouseById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/warehouses";
    app.get(path, getWarehouses);
    app.get(`${path}/:id`, getWarehouseById);
    app.post(path, validate(itemValidators), createWarehouse);
    app.patch(`${path}/:id`, validate(itemValidators), updateWarehouse);
    app.delete(path, deleteWarehouses);
    app.delete(`${path}/:id`, deleteWarehouseById);
  },
};
