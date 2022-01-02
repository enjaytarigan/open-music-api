const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getAllSongsHandler = this.getAllSongsHandler.bind(this);
    this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
    this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
    this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
  }

  async postSongHandler(request, h) {
    const { payload } = request;
    try {
      await this._validator.validateSongPayload(payload);
      const songId = await this._service.addSong(payload);
      const response = h.response({
        status: 'success',
        data: {
          songId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      console.log(error);
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
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

  async getAllSongsHandler(request, h) {
    try {
      const songs = await this._service.getSongs(request.query);
      return {
        message: 'success',
        data: {
          songs,
        },
      };
    } catch (error) {
      console.log(error);
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
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

  async getSongByIdHandler(request, h) {
    const { id } = request.params;
    try {
      const song = await this._service.getSongById(id);
      return {
        status: 'success',
        data: {
          song,
        },
      };
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
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

  async putSongByIdHandler(request, h) {
    const { id } = request.params;
    const { payload } = request;
    try {
      await this._validator.validateSongPayload(payload);
      await this._service.editSongById(id, payload);
      return {
        status: 'success',
        message: `Song with id ${id} successfuly updated`,
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

  async deleteSongByIdHandler(request, h) {
    const { id } = request.params;
    try {
      await this._service.deleteSongById(id);
      return {
        status: 'success',
        message: `Song with id ${id} successfuly deleted`,
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

module.exports = SongsHandler;
