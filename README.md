# 🎬 Movie App - <code>Vibe Coding</code>

A simple and modern Angular movie app using TMDB API with Google login.

## ✨ What's Inside

- 🎥 Browse popular <strong>movies</strong> and <strong>TV shows</strong>
- 🔍 Search for <em>movies</em> and <em>actors</em>
- 📱 Works great on <mark>phones and computers</mark>
- 🔐 Login with your <strong>Google account</strong>
- 🎨 Beautiful design with <em>smooth animations</em>

## 🚀 Getting Started

### What You Need First

- <code>Node.js</code> (version 18 or newer)
- <code>Angular CLI</code>
- <strong>TMDB API account</strong> (free)
- <em>Google OAuth setup</em>

### Setup Steps

**1. Download the code**
```bash
git clone https://github.com/AfshinKariml/Angular-movie-app
cd movie-app
```

**2. Install everything**
```bash
npm install
```

**3. Add your API keys**

Copy the example file:
```bash
cp src/environments/environment.example.ts src/environments/environment.development.ts
```

Get your keys:
- <strong>TMDB API key</strong>: Go to [TMDB](https://www.themoviedb.org/) and create account
- <strong>Google OAuth</strong>: Set up at [Google Console](https://console.developers.google.com/)

**4. Start the app**
```bash
npm start
```

**5. Open in browser**
Go to `http://localhost:4200`

## 🔧 API Keys Setup

| Key | What it's for | Required |
|-----|---------------|----------|
| `TMDB_READ_ACCESS_TOKEN` | Get <strong>movie data</strong> | ✅ Yes |
| `TMDB_API_KEY` | <em>TMDB API access</em> | ✅ Yes |
| `GOOGLE_CLIENT_ID` | <strong>Google login</strong> | ✅ Yes |
| `GOOGLE_CLIENT_SECRET` | <em>Google auth</em> | ✅ Yes |
| `AUTH_TOKEN_KEY` | Store <mark>login info</mark> | ⚪ Optional |

## 🌐 Put It Online

### Easy way with Vercel
1. Connect your GitHub to Vercel
2. Add your API keys in Vercel settings
3. It will go live automatically when you push code

### Build it yourself
```bash
npm run build:prod
```

## 📁 How It's Organized

```
src/
├── app/           # All the Angular code
├── assets/        # Images and files
└── environments/  # API keys and settings
```

## 🛠️ Made With

- **Angular 19** - The main framework
- **Tailwind CSS** - Makes it look good
- **TMDB API** - Gets all the movie info
- **Google OAuth** - Easy login
- **Swiper** - Smooth sliding animations

---

*Happy coding! 🎉*
