import cors from 'cors';
import { env } from '../config/env.js';
import { AppError } from '../errors/AppError.js';

function isSameHost(origin, req) {
  try {
    return new URL(origin).host === req.headers.host;
  } catch {
    return false;
  }
}

/** Allows the site's own pages plus any origin listed in CLIENT_ORIGINS. */
export const apiCors = cors((req, callback) => {
  const origin = req.headers.origin;
  if (!origin || isSameHost(origin, req) || env.clientOrigins.includes(origin)) {
    callback(null, { origin: true, methods: ['GET', 'POST'] });
    return;
  }
  callback(new AppError(403, 'This website is not allowed to use this API.'));
});
