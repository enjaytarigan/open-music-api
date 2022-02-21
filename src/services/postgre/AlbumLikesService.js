const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class AlbumLikesService {
  constructor() {
    this._pool = new Pool();
  }

  async likeOrUnlikeAlbumById({ albumId, userId }) {
    try {
      await this.checkAlbumHasLikeByUserId({ albumId, userId });
      const id = `album-likes-${nanoid(16)}`;
      const query = {
        text: 'INSERT INTO user_album_likes(id, user_id, album_id) VALUES($1, $2, $3)',
        values: [id, userId, albumId],
      };

      await this._pool.query(query);

      return 'like';
    } catch (error) {
      const query = {
        text: 'DELETE FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
        values: [userId, albumId],
      };

      await this._pool.query(query);
      return 'unlike';
    }
  }

  async getTotalLikesAlbumById(albumdId) {
    const query = {
      text: 'SELECT count(album_id) FROM user_album_likes WHERE album_id = $1',
      values: [albumdId],
    };

    const result = await this._pool.query(query);
    const { count } = result.rows[0];
    return Number(count);
  }

  async checkAlbumHasLikeByUserId({ albumId, userId }) {
    const query = {
      text: 'SELECT id FROM user_album_likes WHERE user_id = $1 AND album_id = $2',
      values: [userId, albumId],
    };

    const { rowCount } = await this._pool.query(query);

    if (rowCount !== 0) {
      throw new Error('user already like this album');
    }
  }
}

module.exports = AlbumLikesService;
