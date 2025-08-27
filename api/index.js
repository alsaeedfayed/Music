// api/index.js

// Dynamic import to handle ES Module format from Angular's build output
module.exports = async (req, res) => {
  const { app } = await import("../dist/Music/server/server.mjs");
  return app(req, res);
};
