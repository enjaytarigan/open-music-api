class PlaylistSongsHandler {
  constructor(
    playlistSongsService,
    playlistsService,
    songsService,
    validator,
    activitiesService,
    cacheService,
  ) {
    this._playlistSongsService = playlistSongsService;
    this._playlistsService = playlistsService;
    this._activiteisService = activitiesService;
    this._validator = validator;
    this._songsService = songsService;
    this.postPlaylistSongsHandler = this.postPlaylistSongsHandler.bind(this);
    this.deletePlaylistSongsHandler =
      this.deletePlaylistSongsHandler.bind(this);
    this.getPlaylistByIdIncludeSongsHandler =
      this.getPlaylistByIdIncludeSongsHandler.bind(this);
    this.getPlaylistSongsActivitiesByPlaylistIdHandler =
      this.getPlaylistSongsActivitiesByPlaylistIdHandler.bind(this);
  }

  async postPlaylistSongsHandler(request, h) {
    this._validator.validatePostPlaylistSongsPayload(request.payload);
    const { id: playlistId } = request.params;
    const { songId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this._songsService.verifySongIsExist(songId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.addPlaylistSongs({ playlistId, songId });
    await this._activiteisService.addActivity({
      playlistId,
      userId: credentialId,
      songId,
      action: 'add',
    });
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
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    await this._playlistSongsService.deletePlaylistSongs({
      playlistId,
      songId,
    });
    await this._activiteisService.addActivity({
      playlistId,
      userId: credentialId,
      songId,
      action: 'delete',
    });
    return {
      status: 'success',
      message: 'Lagu berhasil dihapus dari playlist',
    };
  }

  async getPlaylistByIdIncludeSongsHandler(request) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const playlist = await this._playlistsService.getPlaylistById(playlistId);
    const songs = await this._playlistSongsService.getSongsByPlaylistId(
      playlistId,
    );
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

  async getPlaylistSongsActivitiesByPlaylistIdHandler(request) {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);
    const activities = await this._activiteisService.getActivities(playlistId);
    return {
      status: 'success',
      data: {
        playlistId,
        activities,
      },
    };
  }
}

module.exports = PlaylistSongsHandler;
