import { AppError } from '../errors/AppError.js';

export function apiNotFound(req, res, next) {
  next(new AppError(404, 'This API route does not exist.'));
}

// Express identifies error handlers by their four arguments, so `next` must stay.
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ ok: false, message: err.message, errors: err.fieldErrors });
    return;
  }

  // Bad JSON and oversized bodies come from express.json() with a 4xx status.
  if (err.status >= 400 && err.status < 500) {
    res.status(err.status).json({ ok: false, message: 'The request could not be read.' });
    return;
  }

  console.error(`[error] ${req.method} ${req.path}:`, err.message);
  res.status(500).json({ ok: false, message: 'Something went wrong. Please try again.' });
}
