const { DbContext } = require("../dbContext");
const bcrypt = require("bcrypt");

function getUserById(id) {
  return DbContext.Users.findByPk(id);
}

function deleteUserById(id) {
  return DbContext.Users.destroy({ where: { userId: id } });
}

async function registerUser(body) {
  const username = body.username;
  const password = await bcrypt.hash(body.password, 10);
  return DbContext.Users.create({ username, password });
}

async function loginUser(body) {
  console.log(body.username, body.password);
  const user = await DbContext.Users.findOne({
    where: { username: body.username },
  });
  console.log(user);
  if (!user) return null;

  const passwordMatch = await bcrypt.compare(
    body.password,
    user.dataValues.password
  );
  if (!passwordMatch) return null;

  return user;
}

function updateUser(id, body) {
  const user = body;
  return DbContext.Users.update(user, { where: { userId: id } });
}

module.exports = {
  getUserById,
  registerUser,
  updateUser,
  deleteUserById,
  loginUser,
};
