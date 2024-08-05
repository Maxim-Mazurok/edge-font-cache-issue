const express = require("express");
const onHeaders = require("on-headers");

function unsetCacheHeaders() {
  this.removeHeader("Etag");
  this.removeHeader("Last-Modified");
}

const app = express();
const port = 3005;

// Serve static files from the "static" directory
app.use(
  express.static("static", {
    setHeaders: function (res, path) {
      if (path.includes("fontawesome-webfont")) {
        onHeaders(res, unsetCacheHeaders); // NOTE: this is the workaround for the issue - force browser not to cache the fontawesome-webfont files
      }
    },
  })
);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
