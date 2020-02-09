const mongoose = require("mongoose");
const Artist = require("../models/artist");

exports.artists_get_all = (req, res, next) => {
  Artist.find()
    .select("firstname lastname _id birthdate")
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        artists: docs.map(doc => {
          return {
            firstname: doc.firstname,
            lastname: doc.lastname,
            birthdate: doc.birthdate,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/artists/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.artists_create_artist = (req, res, next) => {
  const artist = new Artist({
    _id: new mongoose.Types.ObjectId(),
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    birthdate: Date(req.birthdate)
  });
  artist
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created artist successfully",
        createdArtist: {
          firstname: result.firstname,
          lastname: result.lastname,
          birthdate: result.birthdate,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/artists/" + result._id
          }
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

exports.artists_get_artist = (req, res, next) => {
  const id = req.params.artistId;
  Artist.findById(id)
    .select("firstname lastname birthdate _id")
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          artist: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/artists"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.artists_update_artist = (req, res, next) => {
  const id = req.params.artistId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Artist.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Artist updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/artists/" + id
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

exports.artists_delete = (req, res, next) => {
  const id = req.params.artistId;
  Artist.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Artist deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/artists",
          body: { firstname: "String", lastname: "String", birthdate: "Date" }
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
