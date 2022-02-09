const Joi = require('joi');

const year = new Date().getFullYear();
const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().min(0).max(year).required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().allow(null, ''),
  albumId: Joi.string().allow(null, ''),
});

module.exports = SongPayloadSchema;
