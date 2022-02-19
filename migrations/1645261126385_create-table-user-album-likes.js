exports.up = (pgm) => {
  pgm.createTable('user_album_likes', {
    id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
    },
    album_id: {
      type: 'VARCHAR(50)',
      notNull: true,
      primaryKey: true,
    },
  });

  pgm.addConstraint(
    'user_album_likes',
    'fk_user_album_likes.user_id-users.id',
    'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE',
  );

  pgm.addConstraint(
    'user_album_likes',
    'fk_user_album_likes.album_id-albums.id',
    'FOREIGN KEY(album_id) REFERENCES albums(id) ON DELETE CASCADE',
  );

  pgm.addConstraint(
    'user_album_likes',
    'unique_user_album_likes.album_id-and-user_id',
    'UNIQUE(album_id, user_id)',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('user_album_likes');
};
