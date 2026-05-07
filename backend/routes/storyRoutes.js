const express = require('express');
const { getStories, getStoryById, toggleBookmark, getBookmarkedStories } = require('../controllers/storyController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', getStories);
router.get('/bookmarks', protect, getBookmarkedStories);
router.get('/:id', getStoryById);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;
