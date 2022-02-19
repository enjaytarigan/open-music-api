const InvariantError = require('../../exceptions/InvariantError');
const { AlbumPayloadSchema, CoverImageHeadersSchema } = require('./schema');

const AlbumsValidator = {
  validateAlbumPayload: (payload) => {
    const validationPayloadAlbumResult = AlbumPayloadSchema.validate(payload);

    if (validationPayloadAlbumResult.error) {
      throw new InvariantError(validationPayloadAlbumResult.error.message);
    }
  },

  validateCoverImageHeaders: (headers) => {
    const validationResult = CoverImageHeadersSchema.validate(headers);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = AlbumsValidator;
