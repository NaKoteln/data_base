const express = require("express"),
  app = express(),
  jwt = require("jsonwebtoken");

const auth = require("./controllers/auth");
const peoples = require("./controllers/peoples");
const groups = require("./controllers/touristGroups");
const tourists = require("./controllers/tourists");
const hotels = require("./controllers/hotels");
const hotelBookings = require("./controllers/hotelBookings");
const agencies = require("./controllers/agencies");
const excursions = require("./controllers/excursions");
const excursionSchedules = require("./controllers/excursionSchedules");
const excursionBookings = require("./controllers/excursionBookings");
const feedbacks = require("./controllers/feedbacks");
const flights = require("./controllers/flights");
const flightSchedules = require("./controllers/flightSchedules");
const purchases = require("./controllers/purchases");
const visas = require("./controllers/visas");
const visaDocuments = require("./controllers/visaDocuments");
const warehouse = require("./controllers/warehouseItems");
const analytics = require("./controllers/analytics");
const users = require("./controllers/users");
const countries = require("./controllers/countries");
const services = require("./controllers/services");
const touristServices = require("./controllers/touristsServices");
const query = require("./controllers/query");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  if (req.originalUrl.startsWith("/auth/")) next();
  else if (req.headers.authorization) {
    jwt.verify(
      req.headers.authorization.split(" ")[1],
      auth.jwtTokenKey,
      (err, payload) => {
        if (err) {
          return res.status(401).send();
        } else if (payload.role == "reader" && req.method != "GET") {
          return res.status(403).send();
        } else if (req.path.startsWith("/query") && payload.role != "admin") {
          return res.status(403).send();
        } else {
          req.user = {
            id: payload.id,
          };
          next();
        }
      }
    );
  } else {
    return res.status(401).send();
  }
});

auth.registerController(app);
peoples.registerController(app);
groups.registerController(app);
tourists.registerController(app);
hotels.registerController(app);
hotelBookings.registerController(app);
agencies.registerController(app);
excursions.registerController(app);
excursionSchedules.registerController(app);
excursionBookings.registerController(app);
feedbacks.registerController(app);
flights.registerController(app);
flightSchedules.registerController(app);
purchases.registerController(app);
visas.registerController(app);
visaDocuments.registerController(app);
warehouse.registerController(app);
analytics.registerController(app);
users.registerController(app);
countries.registerController(app);
services.registerController(app);
touristServices.registerController(app);
query.registerController(app);

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("App listening on port " + port + "!");
});

module.exports = app;
