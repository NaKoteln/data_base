const { DbContext } = require("../dbContext");

function getPurchases() {
    return DbContext.Purchases.findAll();
}

function deletePurchases() {
    return DbContext.Purchases.destroy({ truncate: true, });
}

function getPurchaseById(id) {
    return DbContext.Purchases.findByPk(id);
}

function deletePurchaseById(id) {
    return DbContext.Purchases.destroy({ where: { purchaseId: id } });
}

function createPurchase(body) {
    const purchase = body;
    return DbContext.Purchases.create(purchase);
}

function updatePurchase(id, body) {
    const purchase = body;
    return DbContext.Purchases.update(purchase, { where: { purchaseId: id, } });
}

module.exports = {
    getPurchases,
    getPurchaseById,
    createPurchase,
    updatePurchase,
    deletePurchases,
    deletePurchaseById
};
