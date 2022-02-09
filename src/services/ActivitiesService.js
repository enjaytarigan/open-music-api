const { nanoid } = require('nanoid');
const { Pool } = require('pg');

class ActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addActivity({ playlistId, songId, userId, action }) {
    const id = `activities-${nanoid(16)}`;
    const query = {
      text: `INSERT INTO 
             playlist_song_activities(id, playlist_id, song_id, user_id, action) 
             VALUES($1, $2, $3, $4, $5)`,
      values: [id, playlistId, songId, userId, action],
    };

    await this._pool.query(query);
  }

  async getActivities(playlistId) {
    const query = {
      text: `SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time
             FROM playlist_song_activities
             INNER JOIN songs ON playlist_song_activities.song_id = songs.id
             INNER JOIN users ON playlist_song_activities.user_id = users.id
             WHERE playlist_song_activities.playlist_id = $1
             GROUP BY playlist_song_activities.playlist_id, playlist_song_activities.action, playlist_song_activities.time, users.username, songs.title
      `,
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    return result.rows;
  }
}

module.exports = ActivitiesService;
