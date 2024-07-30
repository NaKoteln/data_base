module.exports = {
  validate: (validators) => async (req, res, next) => {
    for (const validator of validators) {
      const errors = await validator.run(req);
      if (errors.isEmpty()) continue;
      return res.status(400).send({ errors: errors.array() });
    }
    next();
  },
};
