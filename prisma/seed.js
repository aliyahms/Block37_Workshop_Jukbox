const prisma = require("../prisma");
const { faker } = require("@faker-js/faker");

const seed = async (numUsers = 5, numPlaylists = 10, numTracks = 20) => {
  // Create users
  const users = Array.from({ length: numUsers }, () => ({
    username: faker.internet.displayName(),
  }));
  await prisma.user.createMany({ data: users });

  // Create tracks
  const tracks = Array.from({ length: numTracks }, () => ({
    name: faker.music.songName(),
  }));
  await prisma.track.createMany({ data: tracks });

  // Create playlists of tracks owned by random user
  for (let i = 0; i < numPlaylists; i++) {
    // create tracks in playlist
    const playlistTracks = Array.from({ length: 12 }, () => ({
      id: 1 + Math.floor(Math.random() * numTracks),
    }));
    await prisma.playlist.create({
      data: {
        name: faker.music.album(),
        description: faker.lorem.sentences(2),
        ownerId: 1 + Math.floor(Math.random() * numUsers),
        tracks: { connect: playlistTracks },
      },
    });
  }
};

seed()
  .then(async () => await prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
