const mongoose = require("mongoose");

const Album = require("../models/album");
const Artist = require("../models/artist");

exports.albums_get_all = (req, res, next) => {
  Album.find()
    .select("artist releasedate rating title year _id")
    .populate("artist", "firstname lastname birthdate")
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        albums: docs.map(doc => {
          return {
            _id: doc._id,
            artist: doc.artist,
            releasedate: doc.releasedate,
            rating: doc.rating,
            title: doc.title,
            year: doc.year,
            request: {
              type: "GET",
              url: "http://localhost:3000/albums/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.albums_create_album = (req, res, next) => {
  Artist.findById(req.body.artistId)
    .then(artist => {
      if (!artist) {
        return res.status(404).json({
          message: "Artist not found"
        });
      }
      const album = new Album({
        _id: mongoose.Types.ObjectId(),
        releasedate: Date(req.body.releasedate),
        rating: req.body.rating,
        title: req.body.title,
        year: req.body.year,
        artist: req.body.artistId
      });
      return album.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Album stored",
        createdAlbum: {
          _id: result._id,
          artist: result.artist,
          title: result.title,
          rating: result.rating,
          releasedate: result.releasedate,
          year: result.year
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/albums/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.albums_get_album = (req, res, next) => {
  const id = req.params.albumId;
  Album.findById(id)
    .populate("artist")
    .exec()
    .then(album => {
      if (!album) {
        return res.status(404).json({
          message: "Album not found"
        });
      }
      res.status(200).json({
        album: album,
        request: {
          type: "GET",
          url: "http://localhost:3000/albums"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};

exports.albums_delete_album = (req, res, next) => {
  Album.remove({ _id: req.params.albumId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Album deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/albums",
          body: { artistId: "ID", title: "String", releasedate: "Date", rating: "Number", year: "String" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
};
