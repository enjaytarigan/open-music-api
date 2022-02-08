const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  version: '1.0.0',
  name: 'playlistSongs',
  register: async (
    server,
    {
      playlistSongsService,
      playlistsService,
      songsService,
      validator,
      activitiesService,
    },
  ) => {
    const playlistSongsHandler = new PlaylistSongsHandler(
      playlistSongsService,
      playlistsService,
      songsService,
      validator,
      activitiesService,
    );
    server.route(routes(playlistSongsHandler));
  },
};
