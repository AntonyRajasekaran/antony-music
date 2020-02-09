const express = require("express");
const router = express.Router();
const ArtistsController = require('../controllers/artists');

router.get("/", ArtistsController.artists_get_all);

router.post("/", ArtistsController.artists_create_artist);

router.get("/:artistId", ArtistsController.artists_get_artist);

router.patch("/:artistId", ArtistsController.artists_update_artist);

router.delete("/:artistId", ArtistsController.artists_delete);

module.exports = router;
