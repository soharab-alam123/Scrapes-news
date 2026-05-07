import React from 'react';
import { Bookmark } from 'lucide-react';
import API from '../services/api';
import { useAuth } from '../context/AuthContext';

const StoryCard = ({ story, isBookmarked, onBookmarkToggle }) => {
    const { user } = useAuth();

    const handleBookmark = async () => {
        if (!user) return alert('Please login to bookmark stories');
        try {
            await API.post(`/stories/${story._id}/bookmark`);
            onBookmarkToggle(story._id);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="story-card">
            <div className="story-info">
                <h3><a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a></h3>
                <div className="story-meta">
                    <span>{story.points} points</span>
                    <span>by {story.author}</span>
                    <span>{story.postedAt}</span>
                </div>
            </div>
            <button 
                className={`bookmark-btn ${isBookmarked ? 'active' : ''}`}
                onClick={handleBookmark}
            >
                <Bookmark size={20} fill={isBookmarked ? "white" : "none"} />
            </button>
        </div>
    );
};

export default StoryCard;
