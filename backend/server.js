require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const scrapeHackerNews = require('./utils/scraper');

const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');
const scrapeRoutes = require('./routes/scrapeRoutes');

mongoose.set('debug', true);

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Routes
app.get('/api/health', (req, res) => res.json({ status: 'ok', db: mongoose.connection.readyState }));
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/scrape', scrapeRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});

// Database connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/hn_scraper';

console.log('Connecting to MongoDB...');
mongoose.connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000 // Timeout after 5s
})
    .then(async () => {
        console.log('MongoDB connected successfully');
        
        // Run scraper on server start
        try {
            await scrapeHackerNews();
        } catch (err) {
            console.error('Initial scraping failed:', err.message);
        }

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch(err => {
        console.error('MongoDB connection error:', err.message);
        // Start server anyway so user can see health check
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT} (Database disconnected)`);
        });
    });

mongoose.connection.on('error', err => {
    console.error('Mongoose connection error:', err);
});
