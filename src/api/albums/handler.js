const ClientError = require('../../exceptions/ClientError');

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
    try {
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
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Internal Server Error',
      });
      response.code(500);
      return response;
    }
  }

  async getAlbumByIdHandler(request, h) {
    const { id } = request.params;
    try {
      const album = await this._service.getAlbumById(id);
      return {
        status: 'success',
        data: {
          album,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Internal Server Error',
      });
      response.code(500);
      return response;
    }
  }

  async putAlbumByIdHandler(request, h) {
    const { payload } = request;
    const { id } = request.params;
    try {
      await this._validator.validateAlbumPayload(payload);
      const { name, year } = payload;
      await this._service.editAlbumById(id, { name, year });
      return {
        status: 'success',
        message: 'Album successfuly updated',
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Internal Server Error',
      });
      response.code(500);
      return response;
    }
  }

  async deleteAlbumByIdHandler(request, h) {
    const { id } = request.params;
    try {
      await this._service.deleteAlbumById(id);
      return {
        status: 'success',
        message: `Album with id ${id} successfuly deleted`,
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }
      const response = h.response({
        status: 'error',
        message: 'Internal Server Error',
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = AlbumsHandler;
