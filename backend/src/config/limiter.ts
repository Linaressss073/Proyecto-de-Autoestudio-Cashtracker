import { rateLimit } from 'express-rate-limit'

export const limiter = rateLimit({
    windowMs: 60 * 1000,
    limit: 12,
    message: {"error" : 'Has alcanzado el limite de peticiones'}
})