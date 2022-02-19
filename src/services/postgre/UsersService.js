const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const AuthenticationError = require('../../exceptions/AuthenticationError');
const NotFoundError = require('../../exceptions/NotFoundError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async addUser({ username, fullname, password }) {
    await this.verifyNewUsername(username);
    const userId = `user-${nanoid(16)}`;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO users(id, username, password, fullname) VALUES ($1, $2, $3, $4) returning id',
      values: [userId, username, hashedPassword, fullname],
    };
    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new InvariantError('User gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async verifyNewUsername(username) {
    const query = {
      text: 'SELECT * FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);
    if (result.rows.length !== 0) {
      throw new InvariantError('Gagal menambahkan user, username telah digunakan');
    }
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, password FROM users WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new AuthenticationError('Kredensial yang anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const isMatch = await bcrypt.compareSync(password, hashedPassword);

    if (!isMatch) {
      throw new AuthenticationError('Kredensial yang anda berikan salah');
    }

    return id;
  }

  async verifyUserIsExist(id) {
    const query = {
      text: 'SELECT fullname FROM users WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);

    if (result.rows.length === 0) {
      throw new NotFoundError('User tidak ditemukan');
    }
  }
}

module.exports = UsersService;
