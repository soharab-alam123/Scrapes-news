const Story = require('../models/Story');
const User = require('../models/User');

exports.getStories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const stories = await Story.find()
            .sort({ points: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Story.countDocuments();

        res.json({
            stories,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

exports.getStoryById = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (story) {
            res.json(story);
        } else {
            res.status(404).json({ message: 'Story not found' });
        }
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

exports.toggleBookmark = async (req, res) => {
    try {
        const userId = req.user._id;
        const storyId = req.params.id;

        // Check if story exists
        const storyExists = await Story.exists({ _id: storyId });
        if (!storyExists) {
            return res.status(404).json({ message: 'Story not found' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isBookmarked = user.bookmarks.some(id => id.toString() === storyId);

        let updatedUser;
        if (isBookmarked) {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { bookmarks: storyId } },
                { new: true }
            );
        } else {
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { bookmarks: storyId } },
                { new: true }
            );
        }

        res.json({ 
            message: isBookmarked ? 'Bookmark removed' : 'Story bookmarked', 
            bookmarks: updatedUser.bookmarks 
        });
    } catch (error) {
        console.error('Error toggling bookmark:', error);
        res.status(500).json({ message: error.message, stack: error.stack });
    }
};

exports.getBookmarkedStories = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).populate('bookmarks');
        res.json(user.bookmarks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
