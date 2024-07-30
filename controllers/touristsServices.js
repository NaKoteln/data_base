const { body } = require("express-validator");
const { validate } = require("./utils");

const dbTouristServices = require("../db/repositories/touristsServices");

async function getTouristServices(req, res) {
    const result = await dbTouristServices.getTouristServices();
    res.send(result);
}

async function getTouristServiceById(req, res) {
    const result = await dbTouristServices.getTouristServiceById(req.params.id);
    res.send(result);
}

const validators = [
    body("date").notEmpty().isISO8601().toDate().withMessage("Введите дату"),
]

async function createTouristService(req, res) {
    const result = await dbTouristServices.createTouristService(req.body);
    res.send(result);
}

async function deleteTouristServices(req, res) {
    const result = await dbTouristServices.deleteTouristServices();
    res.send({ res: result });
}

async function deleteTouristServiceById(req, res) {
    const result = await dbTouristServices.deleteTouristServiceById(req.params.id);
    res.send({ res: result });
}

async function updateTouristService(req, res) {
    const result = await dbTouristServices.updateTouristService(req.params.id, req.body);
    res.send(result);
}

module.exports = {
    registerController: (app) => {
        const path = "/touristServices";
        app.get(path, getTouristServices);
        app.get(`${path}/:id`, getTouristServiceById);
        app.post(path, validate(validators), createTouristService);
        app.patch(`${path}/:id`, validate(validators), updateTouristService);
        app.delete(path, deleteTouristServices);
        app.delete(`${path}/:id`, deleteTouristServiceById);
    },
};
