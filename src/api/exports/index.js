const ExportsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  version: '1.0.0',
  name: 'export playlist',
  register: async (
    server,
    { producerService, playlistsService, validator },
  ) => {
    const exportsHandler = new ExportsHandler(
      producerService,
      playlistsService,
      validator,
    );

    server.route(routes(exportsHandler));
  },
};
