const Joi = require('joi');

const SongPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().min(0).required(),
  genre: Joi.string().required(),
  performer: Joi.string().required(),
  duration: Joi.number().allow(null, ''),
  albumId: Joi.string().allow(null, ''),
});

module.exports = SongPayloadSchema;
