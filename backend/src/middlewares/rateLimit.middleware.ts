import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: {
    message: 'Too many login attempts, try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    message: 'Too many register attempts, try again later',
  },
  standardHeaders: true,
  legacyHeaders: false,
});
