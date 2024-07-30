const { sequelize } = require("../db/dbContext");

async function runQuery(req, res) {
  const sql = req.body.sql;
  let result;
  try {
    result = await sequelize.query(sql);
  } catch (error) {
    result = error;
  }
  res.send(result);
}

module.exports = {
  registerController: (app) => {
    const path = "/query";
    app.post(path, runQuery);
  },
};
