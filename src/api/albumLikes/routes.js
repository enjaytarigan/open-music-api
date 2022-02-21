const routes = (handler) => [
  {
    path: '/albums/{id}/likes',
    method: 'POST',
    handler: handler.postUpdateLikeAlbumHandler,
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
