const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
    try {
        console.log('Starting scrape...');
        const { data } = await axios.get('https://news.ycombinator.com/');
        const $ = cheerio.load(data);
        const stories = [];

        $('.athing').slice(0, 10).each((i, element) => {
            const id = $(element).attr('id');
            const titleElement = $(element).find('.titleline > a');
            const title = titleElement.text();
            const url = titleElement.attr('href');
            
            const subtext = $(element).next();
            const points = parseInt(subtext.find('.score').text()) || 0;
            const author = subtext.find('.hnuser').text() || 'Anonymous';
            const postedAt = subtext.find('.age').attr('title') || subtext.find('.age').text();

            stories.push({
                hnId: id,
                title,
                url,
                points,
                author,
                postedAt
            });
        });

        // Upsert stories to avoid duplicates and update points/comments
        const bulkOps = stories.map(story => ({
            updateOne: {
                filter: { hnId: story.hnId },
                update: { $set: story },
                upsert: true
            }
        }));

        if (bulkOps.length > 0) {
            await Story.bulkWrite(bulkOps);
        }

        console.log(`Successfully scraped ${stories.length} stories.`);
        return stories;
    } catch (error) {
        console.error('Scraping error:', error.message);
        throw error;
    }
};

module.exports = scrapeHackerNews;
