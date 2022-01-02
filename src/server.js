require('dotenv').config();

const Hapi = require('@hapi/hapi');
const albums = require('./api/albums');
const AlbumsService = require('./services/AlbumsService');
const AlbumsValidator = require('./validator/albums');

const main = async () => {
  const albumsService = new AlbumsService();
  const server = await Hapi.server({
    host: process.env.HOST,
    port: process.env.PORT,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register({
    plugin: albums,
    options: { service: albumsService, validator: AlbumsValidator },
  });

  await server.start();
  console.log(`Server running in ${server.info.uri}`);
};

main();
