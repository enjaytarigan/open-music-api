const redis = require('redis');

class CacheService {
  constructor() {
    this._client = redis.createClient({
      socket: { host: process.env.REDIS_SERVER },
    });

    this._client.on('error', (error) => console.log(error));

    this._client.connect();
  }

  async add(key, value, expirationInSecond = 1800) {
    await this._client.set(key, value, { EX: expirationInSecond });
  }

  async get(key) {
    const result = await this._client.get(key);

    if (!result) {
      throw new Error('Cache not found');
    }

    return result;
  }

  async delete(key) {
    return this._client.del(key);
  }
}

module.exports = CacheService;
