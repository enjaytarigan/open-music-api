const PlaylistsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  version: '1.0.0',
  name: 'playlists',
  register: async (server, { playlistsService, validator }) => {
    const playlistsHandler = new PlaylistsHandler(playlistsService, validator);

    server.route(routes(playlistsHandler));
  },
};
