const dbAnalytics = require("../db/repositories/analytics");
async function getReport1(req, res) {
  const result = await dbAnalytics.getReport1(req.query);
  res.send(result);
}

async function getReport2(req, res) {
  const result = await dbAnalytics.getReport2(req.query);
  res.send(result);
}

async function getReport3(req, res) {
  const result = await dbAnalytics.getReport3(req.query);
  res.send({ result });
}

async function getReport4(req, res) {
  const result = await dbAnalytics.getReport4(req.query);
  res.send(result);
}

async function getReport5(req, res) {
  const result = await dbAnalytics.getReport5(req.query);
  res.send(result);
}

async function getReport6(req, res) {
  const result = await dbAnalytics.getReport6(req.query);
  res.send({ result });
}

async function getReport7(req, res) {
  const result = await dbAnalytics.getReport7();
  res.send(result);
}

async function getReport8(req, res) {
  const result = await dbAnalytics.getReport8(req.query);
  res.send(result);
}

async function getReport9(req, res) {
  const result = await dbAnalytics.getReport9(req.query);
  res.send(result);
}

async function getReport10(req, res) {
  const result = await dbAnalytics.getReport10(req.query);
  res.send(result);
}

async function getReport11(req, res) {
  const result = await dbAnalytics.getReport11(req.query);
  res.send(result);
}

async function getReport12(req, res) {
  const result = await dbAnalytics.getReport12();
  res.send(result);
}

async function getReport13(req, res) {
  const result = await dbAnalytics.getReport13(req.query);
  res.send({ result });
}

async function getReport14(req, res) {
  const result = await dbAnalytics.getReport14(req.query);
  res.send(result);
}
async function getReport15(req, res) {
  const result = await dbAnalytics.getReport15(req.query);
  res.send(result);
}

module.exports = {
  registerController: (app) => {
    const path = "/analytics";
    app.get(`${path}/1/`, getReport1);
    app.get(`${path}/2`, getReport2);
    app.get(`${path}/3`, getReport3);
    app.get(`${path}/4`, getReport4);
    app.get(`${path}/5`, getReport5);
    app.get(`${path}/6`, getReport6);
    app.get(`${path}/7`, getReport7);
    app.get(`${path}/8`, getReport8);
    app.get(`${path}/9`, getReport9);
    app.get(`${path}/10`, getReport10);
    app.get(`${path}/11`, getReport11);
    app.get(`${path}/12`, getReport12);
    app.get(`${path}/13`, getReport13);
    app.get(`${path}/14`, getReport14);
    app.get(`${path}/15`, getReport15);
  },
};
