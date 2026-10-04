// middleware/errorHandler.js -- new in Session 11.
// The same function that sat at the bottom of server.js.

// Four parameters (err, req, res, next) are what make Express treat
// this as an error handler rather than an ordinary middleware.
export default function errorHandler(err, req, res, next) {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ error: err.errors.map((e) => e.message) });
  }
  console.error(err.message);
  const status = err.status || 500;
  res.status(status).json({ error: err.message });
}