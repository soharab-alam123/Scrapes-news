import axios from 'axios';

const base = (import.meta.env.VITE_API_URL || 'https://scrapes-news-backend-k2se.onrender.com').replace(/\/$/, '');
const API = axios.create({
    baseURL: base.endsWith('/api') ? `${base}/` : `${base}/api/`
});

API.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
});

export default API;
