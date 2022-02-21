class AlbumsHandler {
  constructor(service, validator, storageService) {
    this._service = service;
    this._validator = validator;
    this._storageService = storageService;
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    this.postCoverUrlAlbumHandler = this.postCoverUrlAlbumHandler.bind(this);
  }

  async postAlbumHandler({ payload }, h) {
    await this._validator.validateAlbumPayload(payload);

    const albumId = await this._service.addAlbum(payload);
    const response = h.response({
      status: 'success',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;
  }

  async getAlbumByIdHandler(request) {
    const { id } = request.params;
    const album = await this._service.getAlbumById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
  }

  async putAlbumByIdHandler(request, h) {
    const { payload } = request;
    const { id } = request.params;

    await this._validator.validateAlbumPayload(payload);
    const { name, year } = payload;
    await this._service.editAlbumById(id, { name, year });
    return {
      status: 'success',
      message: 'Album successfuly updated',
    };
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    await this._service.deleteAlbumById(id);
    return {
      status: 'success',
      message: `Album with id ${id} successfuly deleted`,
    };
  }

  async postCoverUrlAlbumHandler(request, h) {
    const { cover } = request.payload;

    this._validator.validateCoverImageHeaders(cover.hapi.headers);

    const filename = await this._storageService.writeFile(cover, cover.hapi);

    const fileLocation = `http://${process.env.HOST}:${process.env.PORT}/albums/covers/${filename}`;

    await this._service.editCoverUrlAlbumById(request.params.id, fileLocation);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
    });
    response.code(201);
    return response;
  }
}

module.exports = AlbumsHandler;
