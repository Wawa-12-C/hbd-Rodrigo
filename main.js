// Birthday website main 
// Focused on cake interaction

// Global variables
let isPlaying = false;
let audioElement;
let memoryCarousel;
let cakeCandlesBlown = false;

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
    initializeCarousel();
    initializeAudio();
    createFloatingParticles();
    
    // Initialize cake message
    const cakeMessage = document.getElementById('cakeMessage');
    if (cakeMessage) {
        cakeMessage.style.opacity = '1';
        cakeMessage.textContent = '🎂 Click the cake to make a wish! 🎂';
    }
    
    // Add smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');
            if (href !== '#') {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Create floating particles effect
function createFloatingParticles() {
    const container = document.getElementById('floaters') || document.getElementById('particles-container');
    if (!container) return;
    
    const elements = ['💖', '✨', '🌟', '💕', '🎈'];
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const particle = document.createElement('div');
            particle.className = 'float';
            particle.textContent = elements[Math.floor(Math.random() * elements.length)];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(particle);
            
            // Animate the particle
            particle.animate([
                { transform: 'translateY(0px) rotate(0deg)', opacity: 0.7 },
                { transform: `translateY(-${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: 8000,
                easing: 'linear'
            }).onfinish = () => particle.remove();
        }
    }, 2000);
}

// Blow out candles from the cake picture
function blowOutCandles() {
    if (cakeCandlesBlown) return; // Prevent multiple clicks
    
    cakeCandlesBlown = true;
    const cakeContainer = document.getElementById('cakeWithCandles');
    const cakeWithoutCandles = document.getElementById('cakeWithoutCandles');
    const message = document.getElementById('cakeMessage');
    const wishMessage = document.getElementById('wishMessage');
    
    if (!cakeContainer || !cakeWithoutCandles) return;
    
    // Animate the transition from cake with candles to cake without candles
    anime({
        targets: cakeContainer,
        opacity: 0,
        scale: 0.95,
        duration: 800,
        easing: 'easeInOutQuad'
    });
    
    anime({
        targets: cakeWithoutCandles,
        opacity: 1,
        scale: 1,
        duration: 800,
        delay: 400,
        easing: 'easeInOutQuad'
    });
    
    // Update messages
    if (message) {
        message.textContent = '🎉 Happy Birthday! Your wish will come true! 🎉';
        message.style.opacity = '1';
    }
    
    if (wishMessage) {
        wishMessage.innerHTML = '<span class="text-coral-pink font-bold">🎂 Wishes granted! Enjoy your special day! 🎂</span>';
    }
    
    // Create celebration effect
    createCelebration();
    
    // Show special wish after delay
    setTimeout(() => {
        showBirthdayWish();
    }, 1500);
}

// Create celebration effect
function createCelebration() {
    const colors = ['#FFF3B0', '#FFE066', '#FFD275', '#FFF8DC'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.width = '8px';
            confetti.style.height = '8px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            document.body.appendChild(confetti);
            
            anime({
                targets: confetti,
                translateY: window.innerHeight + 100,
                translateX: (Math.random() - 0.5) * 200,
                rotate: Math.random() * 360,
                opacity: [1, 0],
                duration: 2500,
                easing: 'easeOutQuad',
                complete: function() {
                    confetti.remove();
                }
            });
        }, i * 100);
    }
}

// Show birthday wish
function showBirthdayWish() {
    const randomWish = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];
    
    const specialMessage = document.createElement('div');
    specialMessage.className = 'fixed inset-0 z-50 flex items-center justify-center bg-black/50';
    specialMessage.innerHTML = `
        <div class="bg-white rounded-3xl p-8 max-w-md mx-4 text-center transform scale-0" id="specialBox">
            <div class="text-6xl mb-4">✨</div>
            <h2 class="quicksand text-3xl font-bold text-coral-pink mb-4">Your Birthday Wish! 🌟</h2>
            <p class="comfortaa text-lg text-charcoal-gray mb-6">
                ${randomWish}
            </p>
            <button onclick="closeSpecialMessage()" class="button">
                Thank You! 💖
            </button>
        </div>
    `;
    
    document.body.appendChild(specialMessage);
    
    setTimeout(() => {
        const specialBox = document.getElementById('specialBox');
        if (specialBox) {
            specialBox.classList.remove('scale-0');
            specialBox.classList.add('scale-100');
        }
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
    const carouselElement = document.getElementById('carousel') || document.getElementById('memoryCarousel');
    if (carouselElement) {
        memoryCarousel = new Splide(carouselElement, {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '1.5rem',
            autoplay: true,
            interval: 4000,
            speed: 650,
            focus: 'center',
            pauseOnHover: true,
            breakpoints: {
                768: { perPage: 1 },
                1024: { perPage: 2 }
            }
        });
        memoryCarousel.mount();
    }
}

// Initialize audio player
function initializeAudio() {
    audioElement = document.getElementById('audio') || document.getElementById('birthdayAudio');
    
    if (audioElement) {
        audioElement.addEventListener('timeupdate', function() {
            const progress = (this.currentTime / this.duration) * 100;
            const progressBar = document.getElementById('progressBar');
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            const currentTime = document.getElementById('currentTime');
            if (currentTime) {
                const minutes = Math.floor(this.currentTime / 60);
                const seconds = Math.floor(this.currentTime % 60);
                currentTime.textContent = 
                    minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
            }
        });
        
        audioElement.addEventListener('ended', function() {
            isPlaying = false;
            const playIcon = document.getElementById('playIcon');
            if (playIcon) {
                playIcon.textContent = '▶️';
            }
        });
    }
}

// Toggle birthday song
function toggleSong() {
    if (!audioElement) return;
    
    if (isPlaying) {
        audioElement.pause();
        const playIcon = document.getElementById('playIcon');
        if (playIcon) {
            playIcon.textContent = '▶️';
        }
    } else {
        audioElement.play();
        const playIcon = document.getElementById('playIcon');
        if (playIcon) {
            playIcon.textContent = '⏸️';
        }
    }
    
    isPlaying = !isPlaying;
}

// Play birthday song directly
function playSong() {
    if (audioElement) {
        audioElement.play();
        isPlaying = true;
        const playIcon = document.getElementById('playIcon');
        if (playIcon) {
            playIcon.textContent = '⏸️';
        }
    }
}

// Generate random birthday wish for wish fountain
function generateWish() {
    const wishDisplay = document.getElementById('wishDisplay');
    if (!wishDisplay) return;
    
    const randomWish = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];
    
    // Animate fountain
    anime({
        targets: '.fountain',
        scale: [1, 1.1, 1],
        duration: 600,
        easing: 'easeInOutQuad'
    });
    
    // Update display with animation
    wishDisplay.innerHTML = `
        <div class="comfortaa text-xl text-coral-pink font-semibold animate-bounce">${randomWish}</div>
    `;
    
    // Create celebration
    createCelebration();
}

// Start celebration function
function startCelebration() {
    // Scroll to cake section
    const cakeSection = document.querySelector('#birthdayCake') || document.querySelector('.cake-section');
    if (cakeSection) {
        cakeSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }
    
    // Create celebration burst
    createCelebration();
    
    // Play song
    setTimeout(() => {
        playSong();
    }, 1000);
}

// Start cake animation (compatibility function)
function startCakeAnimation() {
    blowOutCandles();
}

// Simple error handling
window.addEventListener('error', function(e) {
    console.error('Script error:', e.message, 'at', e.filename, ':', e.lineno);
});

// Performance optimization
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

// Add resize handler
window.addEventListener('resize', debounce(function() {
    if (memoryCarousel) {
        memoryCarousel.refresh();
    }
}, 250));

// Export functions for global access
window.startCelebration = startCelebration;
window.playSong = playSong;
window.toggleSong = toggleSong;
window.blowOutCandles = blowOutCandles;
window.generateWish = generateWish;
window.closeSpecialMessage = closeSpecialMessage;
window.startCakeAnimation = startCakeAnimation;
