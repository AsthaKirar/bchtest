const express = require('express');
const connectDB = require('./config/db'); // Import DB connection
const urlRoutes = require('./routes/url'); // Import your URL routes
const userRoutes = require('./routes/user'); // Import your user routes
const rateLimiter = require('./middleware/rateLimiter'); // Import rate limiter middleware
require('dotenv').config(); // Load environment variables at the top

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json()); // Parse incoming JSON data
app.use(rateLimiter); // Apply rate-limiting middleware

// Routes
app.use('/api/url', urlRoutes); // URL-related routes
app.use('/api/user', userRoutes); // User-related routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
