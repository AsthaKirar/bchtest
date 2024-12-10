const jwt = require('jsonwebtoken');

const auth = async (req, res, next) => {
    try {
        // Get token from header
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            return res.status(401).json({ error: 'No authentication token, authorization denied' });
        }

        try {
            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Add user from payload
            req.user = decoded;
            next();
        } catch (e) {
            res.status(401).json({ error: 'Token is not valid' });
        }
    } catch (err) {
        console.error('Error in auth middleware:', err);
        res.status(500).json({ error: 'Server Error' });
    }
};

module.exports = auth;
