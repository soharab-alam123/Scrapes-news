import React, { useState, useEffect } from 'react';
import API from '../services/api';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Bookmarks = () => {
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuth();

    if (!user) return <Navigate to="/login" />;

    const fetchBookmarks = async () => {
        setLoading(true);
        try {
            const { data } = await API.get('/stories/bookmarks');
            setStories(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookmarks();
    }, []);

    const handleBookmarkToggle = (id) => {
        setStories(prev => prev.filter(s => s._id !== id));
    };

    return (
        <div className="container">
            <h1>My Bookmarks</h1>
            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading bookmarks...</div>
            ) : stories.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#a0a0a0' }}>
                    <p>No bookmarked stories yet.</p>
                </div>
            ) : (
                <div style={{ marginTop: '2rem' }}>
                    {stories.map(story => (
                        <StoryCard 
                            key={story._id} 
                            story={story} 
                            isBookmarked={true}
                            onBookmarkToggle={handleBookmarkToggle}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Bookmarks;
