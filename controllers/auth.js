const { body } = require("express-validator");
const { validate } = require("./utils");

const jwt = require("jsonwebtoken");
const { DbContext } = require("../db/dbContext");
const dbUsers = require("../db/repositories/users");

const jwtTokenKey = "1a2b-3c4d-5e6f-7g8h-corgy";

const authValidators = [
  body("username")
    .trim()
    .isAlpha("en-US", { ignore: " " })
    .notEmpty()
    .withMessage("Имя пользователя - строка, должно быть уникальным")
    .custom((value) => {
      return DbContext.Users.findOne({ where: { username: value } }).then(
        (user) => {
          if (user) return new Error("Имя уже занято");
          else return true;
        }
      );
    }),
  body("password")
    .trim()
    .notEmpty()
    .isString()
    .withMessage("Пароль не должен быть пустым"),
];

async function registerUser(req, res) {
  const result = await dbUsers.registerUser(req.body);
  res.send(result);
}

async function loginUser(req, res) {
  const user = await dbUsers.loginUser(req.body);
  if (user) {
    return res.status(200).json({
      id: user.userId,
      token: jwt.sign(
        {
          id: user.userId,
          role: user.role,
        },
        jwtTokenKey
      ),
    });
  }

  return res.status(404).json({ message: "User not found" });
}

// SELECT * FROM public."Hotels" ORDER BY "hotelId" ASC 
// SELECT * FROM public."Hotels" WHERE "Hotels".name = 'HotelName'
// INSERT INTO "Hotels" ("hotelId","name","nightCost","createdAt","updatedAt") VALUES (DEFAULT,'HotelName',800,current_date,current_date) RETURNING "hotelId","name","nightCost","createdAt","updatedAt"

module.exports = {
  jwtTokenKey,
  registerController: (app) => {
    const path = "/auth";
    app.post(`${path}/register`, validate(authValidators), registerUser);
    app.post(`${path}/login`, loginUser);
  },
};
