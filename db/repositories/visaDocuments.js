const { DbContext } = require("../dbContext");

function getVisaDocuments() {
    return DbContext.VisaDocuments.findAll();
}

function deleteVisaDocuments() {
    return DbContext.VisaDocuments.destroy({ truncate: true, });
}

function getVisaDocumentById(id) {
    return DbContext.VisaDocuments.findByPk(id);
}

function deleteVisaDocumentById(id) {
    return DbContext.VisaDocuments.destroy({ where: { documentId: id } });
}

function createVisaDocument(body) {
    const visaDocument = body;
    return DbContext.VisaDocuments.create(visaDocument);
}

function updateVisaDocument(id, body) {
    const visaDocument = body;
    return DbContext.VisaDocuments.update(visaDocument, { where: { documentId: id, } });
}

module.exports = {
    getVisaDocuments,
    getVisaDocumentById,
    createVisaDocument,
    updateVisaDocument,
    deleteVisaDocuments,
    deleteVisaDocumentById
};
