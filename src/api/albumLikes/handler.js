class AlbumLikesHandler {
  constructor(albumLikesService, albumsService, cacheService) {
    this._albumLikesService = albumLikesService;
    this._albumsService = albumsService;
    this._cacheService = cacheService;
    this.postUpdateLikeAlbumHandler =
      this.postUpdateLikeAlbumHandler.bind(this);

    this.getTotalLikesAlbumByIdHandler = this.getTotalLikesAlbumByIdHandler.bind(this);
  }

  async postUpdateLikeAlbumHandler(request, h) {
    const { id: userId } = request.auth.credentials;
    const { id: albumId } = request.params;

    await this._albumsService.verifyAlbumIsExist(albumId);
    const action = await this._albumLikesService.likeOrUnlikeAlbumById({
      albumId,
      userId,
    });
    await this._cacheService.delete(`album_likes:${albumId}`);
    const response = h.response({
      status: 'success',
      message: `Success ${action} album`,
    });
    response.code(201);
    return response;
  }

  async getTotalLikesAlbumByIdHandler({ params: { id } }, h) {
    try {
      const likes = await this._cacheService.get(`album_likes:${id}`);
      const response = h.response({
        status: 'success',
        data: {
          likes: +likes,
        },
      });
      response.header('X-Data-Source', 'cache');
      return response;
    } catch (error) {
      const likes = await this._albumLikesService.getTotalLikesAlbumById(id);
      await this._cacheService.add(`album_likes:${id}`, likes.toString());
      return {
        status: 'success',
        data: {
          likes,
        },
      };
    }
  }
}

module.exports = AlbumLikesHandler;
