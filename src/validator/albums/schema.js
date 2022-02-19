const Joi = require('joi');

const AlbumPayloadSchema = Joi.object({
  name: Joi.string().required(),
  year: Joi.number().integer().min(0).max(new Date().getFullYear()).required(),
});

const CoverImageHeadersSchema = Joi.object({
  'content-type': Joi.string().valid(
    'image/png',
    'image/avif',
    'image/gif',
    'image/jpeg',
    'image/apng',
    'image/svg+xml',
    'image/webp',
    'image/jpg',
  ),
}).unknown();

module.exports = { AlbumPayloadSchema, CoverImageHeadersSchema };
