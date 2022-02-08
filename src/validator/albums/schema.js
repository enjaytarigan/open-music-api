const Joi = require('joi');

const year = new Date().getFullYear();
const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi
    .number()
    .integer()
    .min(0)
    .max(year)
    .required(),
});

module.exports = { AlbumPayloadSchema };
