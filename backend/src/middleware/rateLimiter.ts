import rateLimit from "express-rate-limit";

const rateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 50,
    message: {
        success: false,
        message: "Too many requests from this IP Address, please try again later."
    },
    standardHeaders: true,
    legacyHeaders: false,
});

export default rateLimiter;