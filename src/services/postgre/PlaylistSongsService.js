const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class PlaylistSongsService {
  constructor(cacheService) {
    this._pool = new Pool();
    this._cacheService = cacheService;
  }

  async addPlaylistSongs({ playlistId, songId }) {
    const id = `playlist_songs-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlist_songs(id, playlist_id, song_id) VALUES($1, $2, $3)',
      values: [id, playlistId, songId],
    };

    await this._pool.query(query);
    await this._cacheService.delete(`playlist_songs:${playlistId}`);
  }

  async deletePlaylistSongs({ playlistId, songId }) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2',
      values: [playlistId, songId],
    };

    await this._pool.query(query);
    await this._cacheService.delete(`playlist_songs:${playlistId}`);
  }

  async getSongsByPlaylistId(playlistId) {
    try {
      const songs = await this._cacheService.get(`playlist_songs:${playlistId}`);
      return JSON.parse(songs);
    } catch (error) {
      const query = {
        text: `
        SELECT s.id, s.title, s.performer
        FROM playlist_songs AS ps
        INNER JOIN songs AS s ON s.id = ps.song_id
        WHERE ps.playlist_id = $1
      `,
        values: [playlistId],
      };

      const result = await this._pool.query(query);
      await this._cacheService.add(`playlist_songs:${playlistId}`, JSON.stringify(result.rows));
      return result.rows;
    }
  }
}

module.exports = PlaylistSongsService;
