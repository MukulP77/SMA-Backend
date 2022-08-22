const joi = require("joi");

const ValidateSignup = (userData) => {
  const Schema = joi.object({
    fullName: joi.string().required().min(5),
    email: joi.string().email().required(),
    password: joi.string().required().min(8),
    phoneNumber: joi.number().required(),
    subscription: joi.string().required(),
  });

  return Schema.validateAsync(userData);
};

const ValidateSignin = (userData) => {
  const Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(8).required(),
  });

  return Schema.validateAsync(userData);
};

module.exports = { ValidateSignin, ValidateSignup };
