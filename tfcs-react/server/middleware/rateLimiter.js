import rateLimit from 'express-rate-limit';
import { AppError } from '../errors/AppError.js';

const limiter = (limit, windowMinutes) =>
  rateLimit({
    windowMs: windowMinutes * 60 * 1000,
    limit,
    standardHeaders: 'draft-8',
    legacyHeaders: false,
    handler: (req, res, next) => next(new AppError(429, 'Too many requests. Please try again later.')),
  });

export const bookingLimiter = limiter(5, 15);
export const newsletterLimiter = limiter(5, 60);
