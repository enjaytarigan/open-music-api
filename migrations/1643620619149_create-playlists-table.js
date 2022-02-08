exports.up = (pgm) => {
  pgm.createTable('playlists', {
    id: {
      primaryKey: true,
      notNull: true,
      type: 'VARCHAR(50)',
    },
    name: {
      notNull: true,
      type: 'TEXT',
    },
    owner: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint(
    'playlists',
    'fk_playlists_owner_users_id',
    'FOREIGN KEY(owner) REFERENCES users(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('playlists');
};
