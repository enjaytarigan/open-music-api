const CollaborationsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  version: '1.0.0',
  name: 'collaborations',
  register: async (
    server,
    { collaborationsService, playlistsService, usersService, validator },
  ) => {
    const collaboraitonsHandler = new CollaborationsHandler(
      collaborationsService,
      playlistsService,
      usersService,
      validator,
    );

    server.route(routes(collaboraitonsHandler));
  },
};
