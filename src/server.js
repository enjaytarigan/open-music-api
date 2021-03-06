require('dotenv').config();

const path = require('path');
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Jwt = require('@hapi/jwt');
const albums = require('./api/albums');
const songs = require('./api/songs');
const users = require('./api/users');
const authentications = require('./api/authentications');
const playlists = require('./api/playlists');
const playlistSongs = require('./api/playlistSongs');
const collaborations = require('./api/collaborations');
const _exports = require('./api/exports');
const albumLikes = require('./api/albumLikes');
const ClientError = require('./exceptions/ClientError');
const AlbumsService = require('./services/postgre/AlbumsService');
const SongsService = require('./services/postgre/SongsService');
const UsersService = require('./services/postgre/UsersService');
const AuthenticationsService = require('./services/postgre/AuthenticationsService');
const PlaylistsService = require('./services/postgre/PlaylistsService');
const PlaylistSongsService = require('./services/postgre/PlaylistSongsService');
const CollaborationsService = require('./services/postgre/CollaborationsService');
const ActivitiesService = require('./services/postgre/ActivitiesService');
const StorageService = require('./services/storage/StorageService');
const AlbumLikesService = require('./services/postgre/AlbumLikesService');
const CacheService = require('./services/redis/CacheServices');
const ProducerService = require('./services/rabbitmq/ProducerService');
const AlbumsValidator = require('./validator/albums');
const SongsValidator = require('./validator/songs');
const UsersValidator = require('./validator/users');
const AuthenticationsValidator = require('./validator/authentications');
const PlaylistsValidator = require('./validator/playlists');
const PlaylistSongsValidator = require('./validator/playlistSongs');
const CollaborationsValidator = require('./validator/collaborations');
const ExportPlaylistValidator = require('./validator/exports');
const TokenManager = require('./tokenize/TokenManager');

const main = async () => {
  const cacheService = new CacheService();
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const playlistSongsService = new PlaylistSongsService(cacheService);
  const collaborationsService = new CollaborationsService(cacheService);
  const playlistsService = new PlaylistsService(collaborationsService, cacheService);
  const activitiesService = new ActivitiesService();
  const storageService = new StorageService(
    path.resolve(__dirname, 'api/albums/file/covers'),
  );
  const albumLikesService = new AlbumLikesService();
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
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  await server.auth.strategy('openmusic_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        validator: AlbumsValidator,
        storageService,
      },
    },
    {
      plugin: songs,
      options: { service: songsService, validator: SongsValidator },
    },
    {
      plugin: users,
      options: { service: usersService, validator: UsersValidator },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        validator: PlaylistsValidator,
      },
    },
    {
      plugin: playlistSongs,
      options: {
        playlistSongsService,
        playlistsService,
        songsService,
        validator: PlaylistSongsValidator,
        activitiesService,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        usersService,
        validator: CollaborationsValidator,
      },
    },
    {
      plugin: _exports,
      options: {
        producerService: ProducerService,
        playlistsService,
        validator: ExportPlaylistValidator,
      },
    },
    {
      plugin: albumLikes,
      options: {
        albumLikesService,
        albumsService,
        cacheService,
      },
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
