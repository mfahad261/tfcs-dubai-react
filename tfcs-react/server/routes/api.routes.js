import express, { Router } from 'express';
import { isMailConfigured } from '../config/env.js';
import { createBooking } from '../controllers/booking.controller.js';
import { subscribe } from '../controllers/newsletter.controller.js';
import { apiCors } from '../middleware/cors.js';
import { apiNotFound } from '../middleware/errorHandler.js';
import { bookingLimiter, newsletterLimiter } from '../middleware/rateLimiter.js';
import { requestLogger } from '../middleware/requestLogger.js';
import { validate } from '../middleware/validate.js';
import { bookingSchema, newsletterSchema } from '../validators/schemas.js';

export const apiRoutes = Router();

apiRoutes.use(requestLogger);
apiRoutes.use(apiCors);
apiRoutes.use(express.json({ limit: '20kb' }));

apiRoutes.get('/health', (req, res) => res.json({ ok: true, email: isMailConfigured ? 'configured' : 'off' }));
apiRoutes.post('/booking', bookingLimiter, validate(bookingSchema), createBooking);
apiRoutes.post('/newsletter', newsletterLimiter, validate(newsletterSchema), subscribe);

apiRoutes.use(apiNotFound);
