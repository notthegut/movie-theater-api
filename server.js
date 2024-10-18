// server.js
const express = require('express');
const app = express();

// Import routes
const userRoutes = require('./routes/users');
const showRoutes = require('./routes/shows');

// Middleware
app.use(express.json());

// Use the routes
app.use('/api', userRoutes);
app.use('/api', showRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
