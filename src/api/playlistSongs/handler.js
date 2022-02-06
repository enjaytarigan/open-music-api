class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistsService, songsService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._validator = validator;
    this._songsService = songsService;
    this.postPlaylistSongsHandler = this.postPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongsHandler =
      this.deletePlaylistSongsHandler.bind(this);
    this.getPlaylistByIdIncludeSongsHandler =
      this.getPlaylistByIdIncludeSongsHandler.bind(this);
  }

  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePostPlaylistSongsPayload(request.payload);
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._songsService.verifySongIsExist(songId);
    await this._playlistSongsService.addPlaylistSongs({ playlistId, songId });
    const response = h.response({
      status: 'success',
      message: 'Lagu berhasil ditambahkan ke playlist',
    });
    response.code(201);
    return response;
  }

  async deletePlaylistSongsHandler(request, h) {
    this._validator.validateDeletePlaylistSongsPayload(request.payload);
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistSongsService.deletePlaylistSongs({
      playlistId,
      songId,
    });
    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }

  async getPlaylistByIdIncludeSongsHandler(request) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    const playlist = await this._playlistsService.getPlaylistById(playlistId);
    const songs = await this._playlistSongsService.getSongsByPlaylistId(playlistId);
    return {
      status: 'success',
      data: {
        playlist: {
          ...playlist,
          songs,
        },
      },
    };
  }
}

module.exports = PlaylistSongsHandler;
