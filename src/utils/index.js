const mapDBAlbumToModel = ({ cover_url: coverUrl, ...album }) => ({
  ...album,
  coverUrl,
});

module.exports = { mapDBAlbumToModel };
