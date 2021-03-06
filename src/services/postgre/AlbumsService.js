const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapDBAlbumToModel } = require('../../utils');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbum({ name, year }) {
    const id = `album-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO albums VALUES ($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);
    return result.rows[0].id;
  }

  async getAlbumById(id) {
    const query = {
      text: 'SELECT * FROM albums WHERE id  = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('Album not found!');
    }

    const querySong = {
      text: 'SELECT id, title, performer FROM songs where "albumId" = $1',
      values: [id],
    };
    const resultQuerySong = await this._pool.query(querySong);
    const songs = resultQuerySong.rows;
    const album = mapDBAlbumToModel(result.rows[0]);
    return { ...album, songs };
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album not found!');
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new NotFoundError('Album not found!');
    }
  }

  async editCoverUrlAlbumById(id, url) {
    const query = {
      text: 'UPDATE albums SET cover_url = $1 WHERE id = $2 returning id',
      values: [url, id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('Album not found!');
    }
  }

  async verifyAlbumIsExist(id) {
    const query = {
      text: 'SELECT id FROM albums WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('Album tidak ditemukan');
    }
  }
}

module.exports = AlbumsService;
