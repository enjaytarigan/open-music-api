class AlbumsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postAlbumHandler = this.postAlbumHandler.bind(this);
    this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
    this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
    this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
  }

  async postAlbumHandler(request, h) {
    const { payload } = request;
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

  async getAlbumByIdHandler(request, h) {
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
}

module.exports = AlbumsHandler;
