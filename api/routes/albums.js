const express = require("express");
const router = express.Router();

const AlbumsController = require('../controllers/albums');

// Handle incoming GET requests to /albums
router.get("/", AlbumsController.albums_get_all);

router.post("/", AlbumsController.albums_create_album);

router.get("/:albumId", AlbumsController.albums_get_album);

router.delete("/:albumId", AlbumsController.albums_delete_album);

module.exports = router;
