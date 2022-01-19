const Joi = require('joi');

const UserPayloadSchema = Joi.object({
  username: Joi.string(),
  password: Joi.string(),
  fullname: Joi.string(),
});

module.exports = { UserPayloadSchema };
