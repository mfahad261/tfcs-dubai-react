import { existsSync } from 'node:fs';
import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import { env } from './config/env.js';
import { transporter } from './config/mailer.js';
import { canonicalUrl } from './middleware/canonicalUrl.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiRoutes } from './routes/api.routes.js';
import { pageRoutes } from './routes/pages.routes.js';
import { checkMailConnection } from './services/email.service.js';

const app = express();

app.set('trust proxy', env.trustProxy);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        // The pages use inline style attributes and Google Fonts.
        styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        styleSrcAttr: ["'unsafe-inline'"],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        upgradeInsecureRequests: null,
      },
    },
  })
);
app.use(compression());
app.use(canonicalUrl);

app.use('/api', apiRoutes);
app.use(pageRoutes);
app.use(errorHandler);

const server = app.listen(env.port, () => {
  console.log(`[server] running on http://localhost:${env.port} (${env.isProduction ? 'production' : 'development'})`);
  if (!existsSync(env.clientDist)) console.warn('[server] website not built yet: run npm run build');
  checkMailConnection();
});

// Drop connections that never finish sending their request.
server.headersTimeout = 15_000;
server.requestTimeout = 30_000;

function shutdown(signal, code = 0) {
  console.log(`[server] ${signal}, closing`);
  transporter.close();
  server.close(() => process.exit(code));
  setTimeout(() => process.exit(code), 10_000).unref();
}

process.on('SIGTERM', () => shutdown('SIGTERM received'));
process.on('SIGINT', () => shutdown('SIGINT received'));
process.on('unhandledRejection', (reason) => console.error('[server] unhandled rejection:', reason));
process.on('uncaughtException', (err) => {
  console.error('[server] uncaught exception:', err);
  shutdown('crash', 1);
});
