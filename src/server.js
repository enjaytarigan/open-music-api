require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const songs = require('./api/songs');
const ClientError = require('./exceptions/ClientError');
const AlbumsService = require('./services/AlbumsService');
const SongsService = require('./services/SongsService');
const AlbumsValidator = require('./validator/albums');
const SongsValidator = require('./validator/songs');

const main = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const server = await Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: albums,
      options: { service: albumsService, validator: AlbumsValidator },
    },
    {
      plugin: songs,
      options: { service: songsService, validator: SongsValidator },
    },
  ]);

  await server.ext('onPreResponse', (request, h) => {
    const { response } = request;
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return response.continue || response;
  });

  await server.start();
  console.log(`Server running in ${server.info.uri}`);
};

main();
