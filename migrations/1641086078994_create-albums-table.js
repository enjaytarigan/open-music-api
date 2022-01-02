/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('albums', {
    id: {
      type: 'VARCHAR(30)',
      notNull: true,
      primaryKey: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    year: {
      type: 'INTEGER',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('albums');
};
