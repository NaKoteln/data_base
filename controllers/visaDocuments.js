const { body } = require("express-validator");
const { validate } = require("./utils");

const dbVisaDocuments = require("../db/repositories/visaDocuments");

async function getVisaDocuments(req, res) {
  const result = await dbVisaDocuments.getVisaDocuments();
  res.send(result);
}

async function getVisaDocumentById(req, res) {
  const result = await dbVisaDocuments.getVisaDocumentById(req.params.id);
  res.send(result);
}

const documentValidators = [
  body("name").trim().isString().withMessage("Name должно быть строкой"),
  body("content").trim().isString("Content должно быть строкой"),
]

async function createVisaDocument(req, res) {
  const result = await dbVisaDocuments.createVisaDocument(req.body);
  res.send(result);
}

async function updateVisaDocument(req, res) {
  const result = await dbVisaDocuments.updateVisaDocument(req.params.id, req.body);
  res.send(result);
}

async function deleteVisaDocuments(req, res) {
  const result = await dbVisaDocuments.deleteVisaDocuments();
  res.send({ res: result });
}

async function deleteVisaDocumentById(req, res) {
  const result = await dbVisaDocuments.deleteVisaDocumentById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/visaDocuments";
    app.get(path, getVisaDocuments);
    app.get(`${path}/:id`, getVisaDocumentById);
    app.post(path, validate(documentValidators), createVisaDocument);
    app.patch(`${path}/:id`, validate(documentValidators), updateVisaDocument);
    app.delete(path, deleteVisaDocuments);
    app.delete(`${path}/:id`, deleteVisaDocumentById);
  },
};
