const Joi = require('joi');

const PostPlaylistSongsSchema = Joi.object({
  songId: Joi.string().required(),
});

const DeletePlaylistSongsSchema = Joi.object({
  songId: Joi.string().required(),
});

module.exports = { PostPlaylistSongsSchema, DeletePlaylistSongsSchema };
