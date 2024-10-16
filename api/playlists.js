// create and export a new Express router
const express = require("express");
const router = express.Router();
module.exports = router;

const prisma = require("../prisma");

// GET /playlists sends array of all playlists
router.get("/", async (req, res, next) => {
  try {
    const playlists = await prisma.playlist.findMany();
    res.json(playlists);
  } catch (e) {
    next(e);
  }
});

// POST /playlists creates a new playlist
// The request should indicate the name, description, ownerId, and trackIds of the playlist
router.post("/", async (req, res, next) => {
  const { name, description, ownerId, trackIds } = req.body;
  const tracks = trackIds.map((id) => ({ id: +id }));
  try {
    const playlist = await prisma.playlist.create({
      data: {
        name,
        description,
        ownerId: +ownerId,
        tracks: { connect: tracks },
      },
      include: {
        owner: true,
        tracks: true,
      },
    });
    res.json(playlist);
  } catch (e) {
    next(e);
  }
});

//GET /playlists/:id sends specific playlist, including all tracks
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const playlist = await prisma.playlist.findUniqueOrThrow({
      where: { id: +id },
      include: { tracks: true },
    });
    res.json(playlist);
  } catch (e) {
    next(e);
  }
});
