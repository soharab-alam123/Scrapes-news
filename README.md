# Hacker News Scraper - MERN Stack

A mini full-stack web application that scrapes the top 10 stories from Hacker News, allows users to register/login, and manage bookmarks.

## Features
- **Auto-Scraping**: Fetches top 10 stories automatically on server start.
- **Manual Scrape**: Trigger scraping via a button on the frontend or API.
- **Authentication**: JWT-based secure user registration and login.
- **Bookmarking**: Save your favorite stories to a personalized list.
- **Pagination**: Browse through stories with ease.
- **Premium UI**: Modern dark theme with smooth interactions.

## Tech Stack
- **Frontend**: React (Vite), Axios, Lucide React, CSS3.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Cheerio (Scraping), JWT.

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed locally (running on `mongodb://127.0.0.1:27017`)

### 1. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. The `.env` file is already configured for local use:
   - `PORT=5000`
   - `MONGODB_URI=mongodb://127.0.0.1:27017/hn_scraper`
   - `JWT_SECRET=supersecretkey123`
4. Start the server:
   ```bash
   npm start
   ```
   *(Note: The server will automatically scrape the top 10 stories on start.)*

### 2. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/stories` - Fetch all stories (paginated)
- `GET /api/stories/:id` - Fetch single story
- `POST /api/stories/:id/bookmark` - Toggle bookmark (Auth required)
- `POST /api/scrape` - Trigger manual scrape

## Environment Variables
Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/hn_scraper
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```
