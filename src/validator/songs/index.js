const InvariantError = require('../../exceptions/InvariantError');
const SongPayloadSchema = require('./schema');

const SongsValidator = {
  validateSongPayload: (payload) => {
    const validationSongPayloadResult = SongPayloadSchema.validate(payload);

    if (validationSongPayloadResult.error) {
      throw new InvariantError(validationSongPayloadResult.error.message);
    }
  },
};

module.exports = SongsValidator;
