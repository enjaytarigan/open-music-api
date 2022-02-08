const InvariantError = require('../../exceptions/InvariantError');
const { AlbumPayloadSchema } = require('./schema');

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationPayloadAlbumResult = AlbumPayloadSchema.validate(payload);

    if (validationPayloadAlbumResult.error) {
      throw new InvariantError(validationPayloadAlbumResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
