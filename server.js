const express = require("express");
const app = express();
const PORT = 3000;

// Built-in body-parser middleware in Express for parsing JSON data.
// It extracts the data from the request body and makes it available in req.body object
app.use(express.json());

// Import routers
app.use("/users", require("./api/users"));
app.use("/playlists", require("./api/playlists"));
app.use("/tracks", require("./api/tracks"));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl}`);
  next();
});

// 404
app.use((req, res, next) => {
  next({ status: 404, message: "Endpoint not found." });
});

// Error-handling
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Sorry, something went wrong :(");
});

// Listening port handler
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
