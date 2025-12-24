// Birthday Website Main JavaScript
// Interactive elements and animations

// Global variables
let isPlaying = false;
let audioElement;
let memoryCarousel;

const style = document.createElement('style');
style.textContent = `
    .cake-container {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        opacity: 0;
        transition: opacity 0.8s ease;
        pointer-events: none;
    }
    .cake-container.active {
        opacity: 1;
        pointer-events: auto;
        cursor: pointer;
    }
    .cake-container img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 20px;
    }
`;
document.head.appendChild(style);

// Birthday wishes array
const birthdayWishes = [
    "May your day be filled with love, laughter, and endless joy! 💕",
    "You make every day brighter just by being in it. Happy Birthday! ☀️",
    "Here's to another year of amazing adventures together! 🌟",
    "You're not just my love, you're my best friend and greatest blessing. 🙏",
    "May all your dreams come true, today and always! ✨",
    "You deserve all the happiness in the world and more! 🌈",
    "Every moment with you is a gift I treasure forever. 💝",
    "You're the reason my world is so beautiful and bright! 🌹",
    "May this year bring you closer to all your heart desires! ❤️",
    "You make my life complete in every possible way! 💖",
    "Here's to celebrating the most wonderful person I know! 🎊",
    "Your smile lights up my world like nothing else can! 😊",
    "May your birthday be as special as you are to me! 🎂",
    "You're my favorite notification, my favorite person, my everything! 📱",
    "Today we celebrate the day the world became brighter with you in it! 🌟"
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeParticles();
    initializeCandles();
    initializeCarousel();
    initializeAudio();
    createFloatingParticles();
    
    // Initialize cake message
    document.getElementById('candleMessage').style.opacity = '0';
    
    });
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Create floating particles effect
function createFloatingParticles() {
    const container = document.getElementById('particles-container');
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(particle);
    }
}

// Initialize candle interactions
function initializeCandles() {
    const cakeWithCandles = document.getElementById('cakeWithCandles');
    
    if (cakeWithCandles) {
        // Add click event to switch pictures
        cakewithCandles.style.cursor = 'pointer';
        cakeWithCandles.addEventListener('click', function() {
            startCakeAnimation();
        });
    }
    
    // Initialize message
    const message = document.getElementById('candleMessage') || document.getElementById('cakeMessage');
    if (message) {
        message.style.opacity = '1';
    }
}

// Start cake animation sequence
function startCakeAnimation() {
    const cakeWithCandles = document.getElementById('cakeWithCandles');
    const cakeWithoutCandles = document.getElementById('cakeWithoutCandles');
    
    if (!cakeWithCandles || !cakeWithoutCandles) return;
    
    // Switch from picture with candles to picture without candles
    cakeWithCandles.style.opacity = '0';
    cakeWithoutCandles.style.opacity = '1';
    
    // Update message
    const message = document.getElementById('candleMessage') || document.getElementById('cakeMessage');
    if (message) {
        message.textContent = '🎉 Happy Birthday! Your wish will come true! 🎉';
    }
    
    // Create celebration effect 
    createCelebrationBrust();
    
    // Show pop-up message after delay
    setTimeout(() => {
        showSpecialMessage();
    }, 1000);
}


// Celebration when all candles are blown out
function celebrateAllCandlesOut() {
    startCakeAnimation();
}

// Create grand finale confetti
function createGrandFinaleConfetti() {
    const colors = ['#FFD700', '#E8B4B8', '#F7E7CE', '#A8B5A0', '#F4C2C2'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 3000);
        }, i * 100);
    }
}


// Show special birthday message
function showSpecialMessage() {
    const specialMessage = document.createElement('div');
    specialMessage.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50';
    specialMessage.innerHTML = `
        <div class="bg-white rounded-3xl p-8 max-w-md mx-4 text-center transform scale-0" id="specialMessageBox">
            <div class="text-6xl mb-4">🎂</div>
            <h2 class="playfair text-3xl font-bold text-burgundy mb-4">Happy Birthday!</h2>
            <p class="dancing text-xl text-charcoal mb-6">
                You are my greatest adventure, my deepest love, and my favorite person. 
                Every day with you is a celebration, but today is all about you!
            </p>
            <button onclick="closeSpecialMessage()" class="bg-gradient-to-r from-rose-gold to-blush-pink text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                I Love You! 💕
            </button>
        </div>
    `;
    
    document.body.appendChild(specialMessage);
    
    // Animate the message box
    setTimeout(() => {
        document.getElementById('specialMessageBox').classList.remove('scale-0');
        document.getElementById('specialMessageBox').classList.add('scale-100');
    }, 100);
}

// Close special message
function closeSpecialMessage() {
    const specialMessage = document.querySelector('.fixed.inset-0.z-50');
    if (specialMessage) {
        specialMessage.remove();
    }
}

// Initialize memory carousel
function initializeCarousel() {
    memoryCarousel = new Splide('#memoryCarousel', {
        type: 'loop',
        perPage: 3,
        perMove: 1,
        gap: '2rem',
        autoplay: true,
        interval: 4000,
        pauseOnHover: true,
        breakpoints: {
            768: {
                perPage: 1,
            },
            1024: {
                perPage: 2,
            }
        }
    });
    
    memoryCarousel.mount();
}

// Initialize audio player
function initializeAudio() {
    audioElement = document.getElementById('birthdayAudio');
    
    audioElement.addEventListener('timeupdate', function() {
        const progress = (this.currentTime / this.duration) * 100;
        document.getElementById('progressBar').style.width = progress + '%';
        
        const minutes = Math.floor(this.currentTime / 60);
        const seconds = Math.floor(this.currentTime % 60);
        document.getElementById('currentTime').textContent = 
            minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    });
    
    audioElement.addEventListener('ended', function() {
        isPlaying = false;
        document.getElementById('playIcon').textContent = '▶️';
    });
}

// Toggle birthday song
function toggleBirthdaySong() {
    if (!audioElement) return;
    
    if (isPlaying) {
        audioElement.pause();
        document.getElementById('playIcon').textContent = '▶️';
    } else {
        audioElement.play();
        document.getElementById('playIcon').textContent = '⏸️';
    }
    
    isPlaying = !isPlaying;
}

// Play birthday song directly
function playBirthdaySong() {
    if (audioElement) {
        audioElement.play();
        isPlaying = true;
        document.getElementById('playIcon').textContent = '⏸️';
    }
}

// Generate random birthday wish
function generateWish() {
    const wishDisplay = document.getElementById('wishDisplay');
    const randomWish = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];
    
    // Create floating wish element
    const floatingWish = document.createElement('div');
    floatingWish.className = 'floating-wish';
    floatingWish.textContent = randomWish;
    
    wishDisplay.appendChild(floatingWish);
    
    // Animate the wish
    anime({
        targets: floatingWish,
        translateY: -100,
        opacity: [1, 0],
        scale: [1, 0.8],
        duration: 4000,
        easing: 'easeOutQuad',
        complete: function() {
            floatingWish.remove();
        }
    });
    
    // Update display
    setTimeout(() => {
        wishDisplay.innerHTML = `<p class="dancing text-xl text-burgundy font-semibold">${randomWish}</p>`;
    }, 500);
    
    // Animate wish well
    anime({
        targets: '.wish-well',
        scale: [1, 1.1, 1],
        duration: 600,
        easing: 'easeInOutQuad'
    });
}

// Start celebration function
function startCelebration() {
    // Scroll to cake section
    document.querySelector('#birthdayCake').scrollIntoView({
        behavior: 'smooth',
        block: 'center'
    });
    
    // Add some celebration effects
    createCelebrationBurst();
    
    // Play birthday song
    setTimeout(() => {
        playBirthdaySong();
    }, 1000);
}

// Create celebration burst effect
function createCelebrationBurst() {
    const colors = ['#FFD700', '#E8B4B8', '#F7E7CE', '#A8B5A0', '#F4C2C2'];
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'confetti';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.top = Math.random() * window.innerHeight + 'px';
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDelay = Math.random() * 2 + 's';
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 3000);
    }
}

// Initialize particles system
function initializeParticles() {
    // This could be enhanced with Matter.js for more complex physics
    // For now, we'll use CSS animations for simplicity
}

// Smooth scroll function for navigation
function smoothScrollTo(element) {
    element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
}

// Add scroll-triggered animations
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.aurora-bg');
    
    if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add touch support for mobile
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function(e) {
        // Add touch feedback for interactive elements
        if (e.target.classList.contains('candle') || 
            e.target.classList.contains('play-button') ||
            e.target.classList.contains('wish-well')) {
            e.target.style.transform = 'scale(0.95)';
        }
    });
    
    document.addEventListener('touchend', function(e) {
        if (e.target.classList.contains('candle') || 
            e.target.classList.contains('play-button') ||
            e.target.classList.contains('wish-well')) {
            e.target.style.transform = 'scale(1)';
        }
    });
}

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(function() {
    // Scroll-based animations can be added here
}, 100);

window.addEventListener('scroll', debouncedScrollHandler);

// Add loading animation
window.addEventListener('load', function() {
    // Fade in the page content
    anime({
        targets: 'body',
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutQuad'
    });
    
    // Animate hero elements
    anime({
        targets: '.typewriter',
        opacity: [0, 1],
        translateY: [50, 0],
        duration: 1500,
        delay: 500,
        easing: 'easeOutQuad'
    });
});

// Error handling for audio
if (audioElement) {
    audioElement.addEventListener('error', function(e) {
        console.log('Audio loading error:', e);
        // Fallback: show message that audio couldn't load
        const playButton = document.getElementById('playButton');
        if (playButton) {
            playButton.title = 'Audio not available';
            playButton.style.opacity = '0.5';
        }
    });
}

// Add resize handler for responsive adjustments
window.addEventListener('resize', debounce(function() {
    // Recalculate positions if needed
    if (memoryCarousel) {
        memoryCarousel.refresh();
    }
}, 250));

// Export functions for global access
window.startCelebration = startCelebration;
window.playBirthdaySong = playBirthdaySong;
window.toggleBirthdaySong = toggleBirthdaySong;
window.generateWish = generateWish;
window.closeSpecialMessage = closeSpecialMessage;
