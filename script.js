/* ===================================
   MUSIC ARTIST WEBSITE - JAVASCRIPT
   Audio Player & Interactive Features
   =================================== */

// ============================================
// SONG DATA - CUSTOMIZE YOUR SONGS HERE
// ============================================
const songs = [
    {
        id: 1,
        title: "Parayathe Ariyathe",
        artist: "Aromal",
        duration: "1:09",
        cover: "assets/images/IMG_7253 (1).jpeg",
        audio: "assets/audio/Sky Walker - PARAYATHE ARIYATHE 2026-01-29 11_08.m4a"
    },
    {
        id: 2,
        title: "Rendu",
        artist: "Aromal",
        duration: "1:31",
        cover: "assets/images/IMG_7536.jpeg",
        audio: "assets/audio/Sky Walker - rendu 2025-02-19 23_02.m4a"
    },
    {
        id: 3,
        title: "Ravin mazha",
        artist: "Aromal",
        duration: "Coming Soon",
        cover: "assets/images/song3.jpg", // Using placeholder image since generation failed
        audio: "",
        upcoming: true
    }
];

// ============================================
// GLOBAL VARIABLES
// ============================================
let currentSongIndex = 0;
let isPlaying = false;
let isSeeking = false;

// DOM Elements
const audioElement = document.getElementById('audioElement');
const audioPlayer = document.getElementById('audioPlayer');
const songsGrid = document.getElementById('songsGrid');
const playPauseBtn = document.getElementById('playPauseBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progressBar');
const progressFill = document.getElementById('progressFill');
const progressHandle = document.getElementById('progressHandle');
const currentTime = document.getElementById('currentTime');
const totalTime = document.getElementById('totalTime');
const playerCover = document.getElementById('playerCover');
const playerSongTitle = document.getElementById('playerSongTitle');
const playerArtist = document.getElementById('playerArtist');
const volumeBtn = document.getElementById('volumeBtn');
const volumeSlider = document.getElementById('volumeSlider');
const volumeFill = document.getElementById('volumeFill');

// ============================================
// INITIALIZE APP
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    renderSongs();
    setupEventListeners();
    setupNavigation();
    setupScrollEffects();
});

// ============================================
// RENDER SONGS TO GRID
// ============================================
function renderSongs() {
    songsGrid.innerHTML = songs.map((song, index) => {
        const isUpcoming = song.upcoming ? 'upcoming' : '';
        const clickAction = song.upcoming ? '' : `onclick="playSong(${index})"`;
        const overlayContent = song.upcoming
            ? '<div class="coming-soon-text">COMING SOON</div>'
            : '<div class="play-icon"><i class="fas fa-play"></i></div>';

        return `
        <div class="song-card ${isUpcoming}" data-index="${index}" ${clickAction}>
            <div class="song-cover">
                <img src="${song.cover}" alt="${song.title}">
                <div class="play-overlay">
                    ${overlayContent}
                </div>
            </div>
            <div class="song-info">
                <div class="song-title">${song.title}</div>
                <div class="song-artist">${song.artist}</div>
                <div class="song-duration">${song.duration}</div>
                <div class="equalizer">
                    <div class="equalizer-bar"></div>
                    <div class="equalizer-bar"></div>
                    <div class="equalizer-bar"></div>
                    <div class="equalizer-bar"></div>
                </div>
            </div>
        </div>
        `;
    }).join('');
}

// ============================================
// PLAY SONG FUNCTION
// ============================================
function playSong(index) {
    if (currentSongIndex === index && isPlaying) {
        pauseSong();
        return;
    }

    currentSongIndex = index;
    const song = songs[index];

    // Update audio source
    audioElement.src = song.audio;
    audioElement.load();

    // Update player UI
    playerCover.src = song.cover;
    playerSongTitle.textContent = song.title;
    playerArtist.textContent = song.artist;

    // Show player
    audioPlayer.classList.add('active');

    // Play audio
    audioElement.play().then(() => {
        isPlaying = true;
        updatePlayButton();
        updateSongCards();
        updateMediaSession(song); // Update lock screen metadata
    }).catch(error => {
        console.log('Audio playback failed:', error);
        // Alert removed for better UX
    });
}

// ============================================
// PLAY FIRST SONG (Hero Button)
// ============================================
function playFirstSong() {
    playSong(0);
    // Smooth scroll to songs section
    document.getElementById('songs').scrollIntoView({ behavior: 'smooth' });
}

// ============================================
// PAUSE SONG
// ============================================
function pauseSong() {
    audioElement.pause();
    isPlaying = false;
    updatePlayButton();
    updateSongCards();
}

// ============================================
// PLAY/PAUSE TOGGLE
// ============================================
function togglePlayPause() {
    if (isPlaying) {
        pauseSong();
    } else {
        audioElement.play().then(() => {
            isPlaying = true;
            updatePlayButton();
            updateSongCards();
        }).catch(error => {
            console.log('Audio playback failed:', error);
        });
    }
}

// ============================================
// NEXT SONG
// ============================================
function nextSong() {
    let nextIndex = (currentSongIndex + 1) % songs.length;

    // Skip upcoming songs
    while (songs[nextIndex].upcoming) {
        nextIndex = (nextIndex + 1) % songs.length;
        // Safety break if all are upcoming (unlikely)
        if (nextIndex === currentSongIndex) return;
    }

    playSong(nextIndex);
}

// ============================================
// PREVIOUS SONG
// ============================================
function prevSong() {
    // If played more than 3 seconds, restart current song
    if (audioElement.currentTime > 3) {
        audioElement.currentTime = 0;
        return;
    }

    let prevIndex = (currentSongIndex - 1 + songs.length) % songs.length;

    // Skip upcoming songs (going backwards)
    while (songs[prevIndex].upcoming) {
        prevIndex = (prevIndex - 1 + songs.length) % songs.length;
        // Safety break
        if (prevIndex === currentSongIndex) return;
    }

    playSong(prevIndex);
}

// ============================================
// UPDATE PLAY BUTTON
// ============================================
function updatePlayButton() {
    const icon = playPauseBtn.querySelector('i');
    if (isPlaying) {
        icon.classList.remove('fa-play');
        icon.classList.add('fa-pause');
    } else {
        icon.classList.remove('fa-pause');
        icon.classList.add('fa-play');
    }
}

// ============================================
// UPDATE SONG CARDS (Highlight Playing)
// ============================================
function updateSongCards() {
    const cards = document.querySelectorAll('.song-card');
    cards.forEach((card, index) => {
        if (index === currentSongIndex && isPlaying) {
            card.classList.add('playing');
            const playIcon = card.querySelector('.play-icon i');
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
        } else {
            card.classList.remove('playing');
            const playIcon = card.querySelector('.play-icon i');
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
        }
    });
}

// ============================================
// FORMAT TIME (seconds to mm:ss)
// ============================================
function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============================================
// UPDATE PROGRESS BAR
// ============================================
function updateProgress() {
    if (!isSeeking && audioElement.duration) {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        progressFill.style.width = `${percent}%`;
        progressHandle.style.left = `${percent}%`;
        currentTime.textContent = formatTime(audioElement.currentTime);
    }
}

// ============================================
// SEEK FUNCTIONALITY
// ============================================
function seek(e) {
    const rect = progressBar.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const time = percent * audioElement.duration;

    if (!isNaN(time)) {
        audioElement.currentTime = time;
        progressFill.style.width = `${percent * 100}%`;
        progressHandle.style.left = `${percent * 100}%`;
    }
}

// ============================================
// VOLUME CONTROL
// ============================================
function setVolume(e) {
    const rect = volumeSlider.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const volume = Math.max(0, Math.min(1, percent));

    audioElement.volume = volume;
    volumeFill.style.width = `${volume * 100}%`;

    // Update volume icon
    const icon = volumeBtn.querySelector('i');
    if (volume === 0) {
        icon.className = 'fas fa-volume-mute';
    } else if (volume < 0.5) {
        icon.className = 'fas fa-volume-down';
    } else {
        icon.className = 'fas fa-volume-up';
    }
}

// ============================================
// TOGGLE MUTE
// ============================================
function toggleMute() {
    if (audioElement.volume > 0) {
        audioElement.dataset.previousVolume = audioElement.volume;
        audioElement.volume = 0;
        volumeFill.style.width = '0%';
        volumeBtn.querySelector('i').className = 'fas fa-volume-mute';
    } else {
        const prevVolume = parseFloat(audioElement.dataset.previousVolume) || 1;
        audioElement.volume = prevVolume;
        volumeFill.style.width = `${prevVolume * 100}%`;
        volumeBtn.querySelector('i').className = 'fas fa-volume-up';
    }
}

// ============================================
// SETUP EVENT LISTENERS
// ============================================
function setupEventListeners() {
    // Player controls
    playPauseBtn.addEventListener('click', togglePlayPause);
    prevBtn.addEventListener('click', prevSong);
    nextBtn.addEventListener('click', nextSong);

    // Audio events
    audioElement.addEventListener('timeupdate', updateProgress);
    audioElement.addEventListener('loadedmetadata', () => {
        totalTime.textContent = formatTime(audioElement.duration);
    });
    audioElement.addEventListener('ended', nextSong);

    // Progress bar
    progressBar.addEventListener('click', seek);
    progressBar.addEventListener('mousedown', () => {
        isSeeking = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isSeeking) {
            seek(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isSeeking = false;
    });

    // Volume control
    volumeSlider.addEventListener('click', setVolume);
    volumeBtn.addEventListener('click', toggleMute);

    // Volume slider drag
    let isVolumeChanging = false;
    volumeSlider.addEventListener('mousedown', () => {
        isVolumeChanging = true;
    });

    document.addEventListener('mousemove', (e) => {
        if (isVolumeChanging) {
            setVolume(e);
        }
    });

    document.addEventListener('mouseup', () => {
        isVolumeChanging = false;
    });
}

// ============================================
// NAVIGATION
// ============================================
function setupNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');

            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// SCROLL EFFECTS
// ============================================
function setupScrollEffects() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================
document.addEventListener('keydown', (e) => {
    // Space bar - play/pause
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        togglePlayPause();
    }

    // Arrow right - next song
    if (e.code === 'ArrowRight') {
        nextSong();
    }

    // Arrow left - previous song
    if (e.code === 'ArrowLeft') {
        prevSong();
    }

    // Arrow up - volume up
    if (e.code === 'ArrowUp') {
        e.preventDefault();
        audioElement.volume = Math.min(1, audioElement.volume + 0.1);
        volumeFill.style.width = `${audioElement.volume * 100}%`;
    }

    // Arrow down - volume down
    if (e.code === 'ArrowDown') {
        e.preventDefault();
        audioElement.volume = Math.max(0, audioElement.volume - 0.1);
        volumeFill.style.width = `${audioElement.volume * 100}%`;
    }

    // M - mute/unmute
    if (e.code === 'KeyM') {
        toggleMute();
    }
});

// ============================================
// MEDIA SESSION API (Lock Screen Controls)
// ============================================
function updateMediaSession(song) {
    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: song.title,
            artist: song.artist,
            artwork: [
                { src: song.cover, sizes: '96x96', type: 'image/jpeg' },
                { src: song.cover, sizes: '128x128', type: 'image/jpeg' },
                { src: song.cover, sizes: '192x192', type: 'image/jpeg' },
                { src: song.cover, sizes: '256x256', type: 'image/jpeg' },
                { src: song.cover, sizes: '384x384', type: 'image/jpeg' },
                { src: song.cover, sizes: '512x512', type: 'image/jpeg' },
            ]
        });

        navigator.mediaSession.setActionHandler('play', togglePlayPause);
        navigator.mediaSession.setActionHandler('pause', togglePlayPause);
        navigator.mediaSession.setActionHandler('previoustrack', prevSong);
        navigator.mediaSession.setActionHandler('nexttrack', nextSong);
    }
}

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🎵 Music Website Loaded Successfully! 🎵', 'color: #e50914; font-size: 20px; font-weight: bold;');
console.log('%cKeyboard Shortcuts:', 'color: #b3b3b3; font-size: 14px;');
console.log('%c  Space - Play/Pause', 'color: #b3b3b3;');
console.log('%c  → - Next Song', 'color: #b3b3b3;');
console.log('%c  ← - Previous Song', 'color: #b3b3b3;');
console.log('%c  ↑ - Volume Up', 'color: #b3b3b3;');
console.log('%c  ↓ - Volume Down', 'color: #b3b3b3;');
console.log('%c  M - Mute/Unmute', 'color: #b3b3b3;');
