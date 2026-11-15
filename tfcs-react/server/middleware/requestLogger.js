/** One line per API call: method, path, status and time taken. No request data is logged. */
export function requestLogger(req, res, next) {
  const started = process.hrtime.bigint();
  res.on('finish', () => {
    const ms = Number(process.hrtime.bigint() - started) / 1e6;
    console.log(`[api] ${req.method} ${req.baseUrl}${req.path} ${res.statusCode} ${ms.toFixed(0)}ms`);
  });
  next();
}
