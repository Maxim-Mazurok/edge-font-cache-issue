const express = require("express");
const app = express();
const port = 3005;

// Middleware to set Cache-Control header
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "max-age=43200"); // 12 hours in seconds
  if (req.url.includes("font-awesome.css")) {
    res.setHeader("Cache-Control", "no-store"); // NOTE: this is the workaround - do not let the browser store cached CSS that references font files
  }
  next();
});

// Enable ETag caching (Express enables this by default)
// app.set("etag", "weak"); // weak because of compression

// Serve static files from the "static" directory
app.use(express.static("static"));

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
