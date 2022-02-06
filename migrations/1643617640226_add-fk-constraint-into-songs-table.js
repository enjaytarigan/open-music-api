exports.up = (pgm) => {
  pgm.addConstraint(
    'songs',
    'fk_songs_albumId_albums_id',
    'FOREIGN KEY("albumId") REFERENCES albums(id)',
  );
};

exports.down = (pgm) => {
  pgm.dropConstraint('songs', 'fk_songs_albumId_albums_id');
};
