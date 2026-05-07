const scrapeHackerNews = require('../utils/scraper');

exports.triggerScrape = async (req, res) => {
    try {
        const stories = await scrapeHackerNews();
        res.json({ message: 'Scrape successful', count: stories.length, stories });
    } catch (error) {
        res.status(500).json({ message: 'Scraping failed', error: error.message });
    }
};
