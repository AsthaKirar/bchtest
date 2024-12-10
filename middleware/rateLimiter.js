const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hours
    max: 5, // Limit each user to 5 requests per day
});

module.exports = limiter;