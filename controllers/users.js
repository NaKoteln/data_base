const dbUsers = require("../db/repositories/users");

async function getUserById(req, res) {
  const result = await dbUsers.getUserById(req.params.id);
  res.send(result);
}

async function updateUser(req, res) {
  const result = await dbUsers.updateUser(req.params.id, req.body);
  res.send(result);
}

async function deleteUserById(req, res) {
  const result = await dbUsers.deleteUserById(req.params.id);
  res.send({ res: result });
}

module.exports = {
  registerController: (app) => {
    const path = "/users";
    app.get(`${path}/:id`, getUserById);
    app.patch(`${path}/:id`, updateUser);
    app.delete(`${path}/:id`, deleteUserById);
  },
};
