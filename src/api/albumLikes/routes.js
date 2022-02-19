const routes = (handler) => [
  {
    path: '/albums/{id}/likes',
    method: 'POST',
    handler: handler.postUserLikeOrUnlikeAlbumByIdHandler,
    options: {
      auth: 'openmusic_jwt',
    },
  },
  {
    path: '/albums/{id}/likes',
    method: 'GET',
    handler: handler.getTotalLikesAlbumByIdHandler,
  },
];

module.exports = routes;
