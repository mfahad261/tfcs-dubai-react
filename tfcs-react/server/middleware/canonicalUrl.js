import { env } from '../config/env.js';

/**
 * Sends visitors to one address: https and no "www".
 * Only acts on requests it can identify for certain, so temporary
 * hosting addresses and local testing keep working.
 */
export function canonicalUrl(req, res, next) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    next();
    return;
  }

  const host = env.canonicalHost;
  const isWww = Boolean(host) && req.hostname === `www.${host}`;
  const isPlainHttp = env.isProduction && req.headers['x-forwarded-proto'] === 'http';

  if (isWww || isPlainHttp) {
    res.redirect(301, `https://${isWww ? host : req.hostname}${req.originalUrl}`);
    return;
  }
  next();
}
