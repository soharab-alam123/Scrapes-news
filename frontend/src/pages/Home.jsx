import React, { useState, useEffect } from 'react';
import API from '../services/api';
import StoryCard from '../components/StoryCard';
import { useAuth } from '../context/AuthContext';
import { RefreshCcw } from 'lucide-react';

const Home = () => {
    const [stories, setStories] = useState([]);
    const [bookmarks, setBookmarks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scraping, setScraping] = useState(false);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const { user } = useAuth();

    const fetchStories = async () => {
        setLoading(true);
        try {
            const { data } = await API.get(`/stories?page=${page}&limit=10`);
            setStories(data.stories);
            setTotalPages(data.pages);
            
            if (user) {
                const bRes = await API.get('/stories/bookmarks');
                setBookmarks(bRes.data.map(b => b._id));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleScrape = async () => {
        setScraping(true);
        try {
            await API.post('/scrape');
            fetchStories();
        } catch (err) {
            console.error(err);
        } finally {
            setScraping(false);
        }
    };

    useEffect(() => {
        fetchStories();
    }, [page, user]);

    const toggleBookmarkInState = (id) => {
        setBookmarks(prev => 
            prev.includes(id) ? prev.filter(bId => bId !== id) : [...prev, id]
        );
    };

    return (
        <div className="container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>Top Stories</h1>
                <button 
                    className="bookmark-btn" 
                    onClick={handleScrape} 
                    disabled={scraping}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <RefreshCcw size={18} className={scraping ? 'spin' : ''} />
                    {scraping ? 'Scraping...' : 'Refresh Feed'}
                </button>
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '2rem' }}>Loading stories...</div>
            ) : (
                <>
                    {stories.map(story => (
                        <StoryCard 
                            key={story._id} 
                            story={story} 
                            isBookmarked={bookmarks.includes(story._id)}
                            onBookmarkToggle={toggleBookmarkInState}
                        />
                    ))}

                    <div className="pagination">
                        <button 
                            className="pagination-btn" 
                            disabled={page === 1} 
                            onClick={() => setPage(p => p - 1)}
                        >
                            Previous
                        </button>
                        <span style={{ alignSelf: 'center' }}>Page {page} of {totalPages}</span>
                        <button 
                            className="pagination-btn" 
                            disabled={page === totalPages} 
                            onClick={() => setPage(p => p + 1)}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Home;
