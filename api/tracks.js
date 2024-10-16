// create and export a new Express router
const express = require("express");
const router = express.Router();
module.exports = router;

// import the Prisma Client so we can access the database (schema and seed file)
const prisma = require("../prisma");

// GET /tracks sends array of all tracks
router.get("/", async (req, res, next) => {
  try {
    const tracks = await prisma.track.findMany();
    res.json(tracks);
  } catch (e) {
    next(e);
  }
});

// GET /tracks/:id sends specific track
router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const track = await prisma.track.findUniqueOrThrow({ where: { id: +id } });
    res.json(track);
  } catch (e) {
    next(e);
  }
});
