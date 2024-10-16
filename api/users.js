// create and export a new Express router
const express = require("express");
const router = express.Router();
module.exports = router;

// import the Prisma Client so we can access the database (schema and seed file)
const prisma = require("../prisma");

// GET /users sends array of all users
router.get("/", async (req, res, next) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (e) {
    next(e);
  }
});

// GET /users/:id sends specific user, including all owned playlists

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: +id }, // `id` has to be converted into a number before looking for it!
      include: { playlists: true },
    });
    if (user) {
      res.json(user);
    } else {
      next({ status: 404, message: `User with id ${id} does not exist.` });
    }
  } catch (e) {
    next(e);
  }
});
