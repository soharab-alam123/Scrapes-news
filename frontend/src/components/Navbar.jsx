import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, Bookmark, Home, User } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <Link to="/" className="logo">HN Scraper</Link>
            <ul className="nav-links">
                <li><Link to="/"><Home size={18} /> Home</Link></li>
                {user ? (
                    <>
                        <li><Link to="/bookmarks"><Bookmark size={18} /> Bookmarks</Link></li>
                        <li><span style={{ color: '#a0a0a0' }}><User size={18} /> {user.username}</span></li>
                        <li><button onClick={handleLogout} className="bookmark-btn" style={{ border: 'none', background: 'none', display: 'flex', alignItems: 'center', gap: '5px' }}><LogOut size={18} /> Logout</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
