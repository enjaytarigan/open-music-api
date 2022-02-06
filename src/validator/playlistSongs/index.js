const InvariantError = require('../../exceptions/InvariantError');
const {
  PostPlaylistSongsSchema,
  DeletePlaylistSongsSchema,
} = require('./schema');

const PlaylistSongsValidator = {
  validatePostPlaylistSongsPayload: (payload) => {
    const validationResult = PostPlaylistSongsSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },

  validateDeletePlaylistSongsPayload: (payload) => {
    const validationResult = DeletePlaylistSongsSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = PlaylistSongsValidator;
