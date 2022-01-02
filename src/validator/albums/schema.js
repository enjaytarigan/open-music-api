const Joi = require('joi');

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(0).required(),
});

module.exports = { AlbumPayloadSchema };
