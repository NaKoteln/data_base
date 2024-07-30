const { DbContext } = require("../dbContext");

function getWarehouses() {
    return DbContext.WarehouseItems.findAll();
}

function deleteWarehouses() {
    return DbContext.WarehouseItems.destroy({ truncate: true, });
}

function getWarehouseById(id) {
    return DbContext.WarehouseItems.findByPk(id);
}

function deleteWarehouseById(id) {
    return DbContext.WarehouseItems.destroy({ where: { productId: id } });
}

function createWarehouse(body) {
    const item = body;
    return DbContext.WarehouseItems.create(item);
}

function updateWarehouse(id, body) {
    const item = body;
    return DbContext.WarehouseItems.update(item, { where: { productId: id, } });
}

module.exports = {
    getWarehouses,
    getWarehouseById,
    createWarehouse,
    updateWarehouse,
    deleteWarehouses,
    deleteWarehouseById
};
