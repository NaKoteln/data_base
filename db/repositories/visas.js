const { DbContext } = require("../dbContext");

function getVisas() {
    return DbContext.Visas.findAll();
}

function deleteVisas() {
    return DbContext.Visas.destroy({ truncate: true, });
}

function getVisaById(id) {
    return DbContext.Visas.findByPk(id);
}

function deleteVisaById(id) {
    return DbContext.Visas.destroy({ where: { visaId: id } });
}

function createVisa(body) {
    const visa = body;
    return DbContext.Visas.create(visa);
}

function updateVisa(id, body) {
    const visa = body;
    return DbContext.Visas.update(visa, { where: { visaId: id, } });
}

module.exports = {
    getVisas,
    getVisaById,
    createVisa,
    updateVisa,
    deleteVisas,
    deleteVisaById
};
