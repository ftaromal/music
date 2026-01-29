# 🎵 FT. Aromal - Music Artist Website

A modern, premium, mobile-first music artist website with dark theme, Netflix-style red accents, and Apple Music/Spotify-inspired design.

## ✨ Features

- **Premium Dark Theme** - Deep black background with Netflix red accents
- **Custom Audio Player** - Full-featured player with play, pause, next, previous, seek, and volume controls
- **Glassmorphism Effects** - Modern frosted glass UI elements
- **Smooth Animations** - Spotify/Apple Music-inspired transitions and micro-interactions
- **Mobile-First Design** - Fully responsive on all screen sizes
- **Animated Equalizer** - Visual feedback when music is playing
- **Keyboard Shortcuts** - Control playback with keyboard
- **Touch-Friendly** - Optimized for mobile devices

## 🎨 Design Highlights

- Dark mode by default
- Netflix-style red (#e50914) accent color
- Apple-style typography (Inter font)
- Glassmorphism cards and player
- Smooth hover effects and transitions
- Animated profile picture glow
- Scroll-based navigation highlighting

## 📁 Project Structure

```
ft.aromal_music/
├── index.html          # Main HTML file
├── style.css           # All styling (dark theme, animations, responsive)
├── script.js           # Audio player functionality and interactions
├── README.md           # This file
└── assets/
    ├── images/         # Banner, profile, and song covers
    │   ├── banner.jpg
    │   ├── profile.jpg
    │   ├── song1.jpg
    │   ├── song2.jpg
    │   ├── song3.jpg
    │   └── song4.jpg
    └── audio/          # Your MP3 files go here
        ├── song1.mp3   (add your files)
        ├── song2.mp3   (add your files)
        ├── song3.mp3   (add your files)
        └── song4.mp3   (add your files)
```

## 🚀 Getting Started

### 1. Add Your Music Files

Place your MP3 files in the `assets/audio/` folder. Name them as:
- `song1.mp3`
- `song2.mp3`
- `song3.mp3`
- `song4.mp3`

Or update the file paths in `script.js` (see Customization section).

### 2. Open the Website

Simply open `index.html` in your web browser. No server required!

For a better experience, you can use a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (http-server)
npx http-server

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

### 3. Deploy to GitHub Pages

1. Create a new repository on GitHub
2. Push your code to the repository
3. Go to Settings → Pages
4. Select your main branch as the source
5. Your site will be live at `https://yourusername.github.io/repository-name/`

## 🎨 Customization Guide

### Update Artist Information

**In `index.html`:**

1. **Artist Name** (appears in multiple places):
   - Line 10: `<title>` tag
   - Line 35: Navigation logo
   - Line 63: Hero title
   - Line 64: Hero subtitle
   - Footer text

2. **Profile Picture**:
   - Replace `assets/images/profile.jpg` with your photo

3. **Banner Image**:
   - Replace `assets/images/banner.jpg` with your banner

4. **About Section** (around line 100):
   - Update the bio text
   - Update social media links

5. **Contact Information** (around line 150):
   - Update email and location

### Update Song List

**In `script.js` (lines 7-38):**

```javascript
const songs = [
    {
        id: 1,
        title: "Your Song Title",        // Change this
        artist: "Your Artist Name",      // Change this
        duration: "3:45",                // Change this
        cover: "assets/images/song1.jpg", // Your cover image
        audio: "assets/audio/song1.mp3"   // Your MP3 file
    },
    // Add more songs...
];
```

### Customize Colors

**In `style.css` (lines 7-20):**

```css
:root {
    --color-bg-primary: #0a0a0a;      /* Background color */
    --color-accent: #e50914;           /* Accent color (red) */
    --color-text-primary: #ffffff;     /* Text color */
    /* ... more colors ... */
}
```

### Add More Songs

1. Add your MP3 file to `assets/audio/`
2. Add a cover image to `assets/images/`
3. Add a new song object to the `songs` array in `script.js`

## ⌨️ Keyboard Shortcuts

- **Space** - Play/Pause
- **→** - Next Song
- **←** - Previous Song
- **↑** - Volume Up
- **↓** - Volume Down
- **M** - Mute/Unmute

## 📱 Mobile Features

- Hamburger menu for navigation
- Touch-friendly controls
- Floating bottom audio player
- Optimized for small screens
- Swipe-friendly interactions

## 🌐 Browser Compatibility

- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Notes

- All code is well-commented for easy customization
- No backend required - pure HTML, CSS, JavaScript
- GitHub Pages compatible
- Audio files are not included (add your own)
- Images are AI-generated placeholders (replace with your own)

## 🎯 Tech Stack

- **HTML5** - Semantic structure
- **CSS3** - Modern styling with variables, flexbox, grid
- **Vanilla JavaScript** - No frameworks or libraries
- **Google Fonts** - Inter font family
- **Font Awesome** - Icons

## 📄 License

This is a custom-built website. Feel free to customize it for your own use.

## 🎵 Enjoy Your Music!

Made with ❤️ for music lovers
