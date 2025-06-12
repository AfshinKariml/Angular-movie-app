🎬 Movie App
A modern Angular movie application powered by TMDB API with Google Authentication.
✨ Features

🎥 Browse popular movies and TV shows
🔍 Search movies and actors
📱 Responsive design with Tailwind CSS
🔐 Google OAuth authentication
🎨 Beautiful UI with Swiper integration

🚀 Quick Start
Prerequisites

Node.js 18+
Angular CLI
TMDB API account
Google OAuth credentials

Installation

Clone the repository
bashgit clone <your-repo-url>
cd movie-app

Install dependencies
bashnpm install

Set up environment variables
Copy the example environment file:
bashcp src/environments/environment.example.ts src/environments/environment.development.ts
Update with your credentials:

Get TMDB API key from TMDB
Get Google OAuth credentials from Google Console


Start development server
bashnpm start

Open your browser
Navigate to http://localhost:4200

🔧 Environment Variables
VariableDescriptionRequiredTMDB_READ_ACCESS_TOKENTMDB API Read Access Token✅TMDB_API_KEYTMDB API Key✅GOOGLE_CLIENT_IDGoogle OAuth Client ID✅GOOGLE_CLIENT_SECRETGoogle OAuth Client Secret✅AUTH_TOKEN_KEYLocal storage key for auth⚪
🌐 Deployment
Vercel Deployment

Connect your repository to Vercel
Add environment variables in Vercel dashboard
Deploy automatically on push

Manual Build
bashnpm run build:prod
📁 Project Structure
src/
├── app/           # Angular components and services
├── assets/        # Static assets
└── environments/  # Environment configurations
🛠️ Built With

Angular 19 - Frontend framework
Tailwind CSS - Styling
TMDB API - Movie data
Google OAuth - Authentication
Swiper - Touch slider