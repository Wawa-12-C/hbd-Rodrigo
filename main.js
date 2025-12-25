// Birthday Website Main JavaScript
// Interactive elements and animations

// Global variables
let isPlaying = false;
let audioElement;

// Birthday wishes array
const birthdayWishes = [
    "May your birthday be filled with endless joy, love, and all the things that make you smile! 😊",
    "You deserve all the happiness in the world and more! Sending you the biggest birthday hugs! ",
    "Warning: This birthday message may cause extreme cuteness, sudden smiles, and intense missing of your huggy girlfriend",
    "My birthday wish? To teleport to you for just one hug! 🤩",
    "I wish you could see yourself through my eyes -- you'd see a man worthy of every good thing 😘",
    "I wish I could be the one to hand you your cake and celebrate with you in person! 🎂",
    "You're not just my love, you're my best friend and favorite person. Happy Birthday 宝贝! ",
    "Happy Birthday to my favorite notification! Getting a message from you always makes my day ",
    "Important Birthday Poll: Which is sweeter? a) Your cake, b) Your smiles, or c) Me?",
    "I wish you have good vibes, awesome food, and the perfect playlist",
    "Happy Birthday! According to my calculations, the birthday boy owes me ∞ kisses 😘",
    "Happy Birthday to the boy who has my whole heart! I'm sending you all my love today and always. ❤️",
    "Happy Birthday. My main wish is that you don't get sick, you're not too tired, and nothing annoys you. Just a smooth, good day. That would make me happy."
];

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded - setting up everything');
    
    // Setup blow candles button
    setupBlowCandlesButton();
    
    // Setup audio
    setupAudio();
    
    // Setup other buttons
    setupButtons();
    
    // Setup carousel
    setupCarousel();
    
    // Show initial message
    const message = document.getElementById('candleMessage');
    if (message) {
        message.style.opacity = '1';
        message.textContent = 'Click the button below to blow out the candles! 🎂';
    }
});

// ========== BLOW CANDLES BUTTON FUNCTIONALITY ==========
function setupBlowCandlesButton() {
    console.log('Setting up blow candles button...');
    
    // Create or get the blow candles button
    let blowButton = document.getElementById('blowCandlesBtn');
    
    if (!blowButton) {
        // Create the button if it doesn't exist
        blowButton = document.createElement('button');
        blowButton.id = 'blowCandlesBtn';
        blowButton.className = 'button';
        blowButton.innerHTML = '🎂 Blow Out Candles! 🎂';
        blowButton.style.cssText = `
            background: linear-gradient(135deg, #FFC857, #FFE066);
            color: #4A4A4A;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 6px 20px rgba(255, 200, 87, 0.3);
            margin-top: 20px;
            display: inline-flex;
            align-items: center;
            gap: 10px;
        `;
        
        // Add hover effects
        blowButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
            this.style.boxShadow = '0 8px 25px rgba(255, 200, 87, 0.4)';
        });
        
        blowButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 6px 20px rgba(255, 200, 87, 0.3)';
        });
        
        // Find where to insert the button (after the cake images)
        const cakeContainer = document.querySelector('.cake-section .relative');
        if (cakeContainer && cakeContainer.parentNode) {
            cakeContainer.parentNode.insertBefore(blowButton, cakeContainer.nextSibling);
        } else {
            // Fallback: add to cake section
            const cakeSection = document.querySelector('.cake-section .max-w-4xl');
            if (cakeSection) {
                cakeSection.appendChild(blowButton);
            }
        }
    }
    
    // Add click event to blow candles
    blowButton.addEventListener('click', function() {
        console.log('Blow candles button clicked!');
        blowOutCandles();
    });
}

function blowOutCandles() {
    console.log('Blowing out candles...');
    
    const cakeWithCandles = document.getElementById('cakeWithCandles');
    const cakeWithoutCandles = document.getElementById('cakeWithoutCandles');
    const message = document.getElementById('candleMessage');
    const blowButton = document.getElementById('blowCandlesBtn');
    
    if (!cakeWithCandles || !cakeWithoutCandles) {
        console.error('Cake images not found!');
        return;
    }
    
    // Disable button during animation
    if (blowButton) {
        blowButton.disabled = true;
        blowButton.style.opacity = '0.7';
        blowButton.style.cursor = 'not-allowed';
        blowButton.innerHTML = '🎉 Blowing Candles... 🎉';
    }
    
    // Add button click animation
    if (blowButton) {
        blowButton.style.transform = 'scale(0.95)';
        setTimeout(() => {
            blowButton.style.transform = 'scale(1)';
        }, 200);
    }
    
    // Switch images: hide cake with candles, show cake without candles
    cakeWithCandles.style.opacity = '0';
    cakeWithoutCandles.style.opacity = '1';
    
    // Update message
    if (message) {
        message.textContent = '🎉 Happy Birthday! Your wish will come true! 🎉';
        message.style.opacity = '1';
        
        // Animate message if anime.js is available
        if (window.anime) {
            anime({
                targets: message,
                scale: [0.9, 1.1, 1],
                duration: 800,
                easing: 'easeOutElastic(1, .8)'
            });
        }
    }
    
    // Create celebration effects
    createCelebration();
    
    // Play birthday song
    setTimeout(() => {
        playBirthdaySong();
    }, 500);
    
    // Show special message
    setTimeout(() => {
        showBirthdayMessage();
        
        // Update button to show completion
        if (blowButton) {
            blowButton.innerHTML = '🎂 Candles Blown Out! 🎂';
            setTimeout(() => {
                blowButton.disabled = false;
                blowButton.style.opacity = '1';
                blowButton.style.cursor = 'pointer';
                blowButton.innerHTML = '🎂 Relight Candles? 🎂';
                
                // Add click to reset (optional)
                blowButton.onclick = function() {
                    resetCandles();
                };
            }, 2000);
        }
    }, 1000);
}

function resetCandles() {
    console.log('Resetting candles...');
    
    const cakeWithCandles = document.getElementById('cakeWithCandles');
    const cakeWithoutCandles = document.getElementById('cakeWithoutCandles');
    const message = document.getElementById('candleMessage');
    const blowButton = document.getElementById('blowCandlesBtn');
    
    if (!cakeWithCandles || !cakeWithoutCandles) return;
    
    // Switch back to cake with candles
    cakeWithCandles.style.opacity = '1';
    cakeWithoutCandles.style.opacity = '0';
    
    // Reset message
    if (message) {
        message.textContent = 'Click the button below to blow out the candles again! 🎂';
    }
    
    // Reset button
    if (blowButton) {
        blowButton.innerHTML = '🎂 Blow Out Candles! 🎂';
        blowButton.onclick = function() {
            blowOutCandles();
        };
    }
    
    // Create small celebration
    createCelebration();
}

// ========== AUDIO FUNCTIONALITY ==========
function setupAudio() {
    console.log('Setting up audio...');
    audioElement = document.getElementById('audio');
    
    if (!audioElement) {
        console.error('Audio element not found!');
        return;
    }
    
    console.log('Audio element found:', audioElement);
    
    // Update progress bar
    audioElement.addEventListener('timeupdate', function() {
        const progressBar = document.getElementById('progressBar');
        if (progressBar && this.duration) {
            const progress = (this.currentTime / this.duration) * 100;
            progressBar.style.width = progress + '%';
        }
        
        // Update current time
        const currentTimeEl = document.getElementById('currentTime');
        if (currentTimeEl) {
            const minutes = Math.floor(this.currentTime / 60);
            const seconds = Math.floor(this.currentTime % 60);
            currentTimeEl.textContent = minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
        }
    });
    
    // Reset when audio ends
    audioElement.addEventListener('ended', function() {
        isPlaying = false;
        const playIcon = document.getElementById('playIcon');
        if (playIcon) {
            playIcon.textContent = '▶️';
        }
    });
    
    // Error handling
    audioElement.addEventListener('error', function(e) {
        console.error('Audio error:', e);
        const playButton = document.getElementById('playButton');
        if (playButton) {
            playButton.style.opacity = '0.5';
            playButton.title = 'Audio file not found';
        }
    });
}

function toggleBirthdaySong() {
    console.log('Toggle song clicked');
    
    if (!audioElement) {
        alert('Audio player not found. Please refresh the page.');
        return;
    }
    
    const playIcon = document.getElementById('playIcon');
    
    if (isPlaying) {
        audioElement.pause();
        if (playIcon) playIcon.textContent = '▶️';
        isPlaying = false;
    } else {
        audioElement.play().catch(function(error) {
            console.error('Playback failed:', error);
            alert('Could not play audio. The audio file might be missing.');
        });
        if (playIcon) playIcon.textContent = '⏸️';
        isPlaying = true;
    }
}

function playBirthdaySong() {
    console.log('Play song clicked');
    
    if (!audioElement) {
        audioElement = document.getElementById('audio');
        if (!audioElement) {
            alert('Audio player not found.');
            return;
        }
    }
    
    const playIcon = document.getElementById('playIcon');
    
    audioElement.play().catch(function(error) {
        console.error('Playback failed:', error);
        alert('Could not play audio. The audio file might be missing.');
    });
    
    if (playIcon) playIcon.textContent = '⏸️';
    isPlaying = true;
}

// ========== OTHER BUTTONS ==========
function setupButtons() {
    console.log('Setting up buttons...');
    
    // Start Celebration button
    const startBtn = document.querySelector('button[onclick="startCelebration()"]');
    if (startBtn) {
        startBtn.onclick = startCelebration;
    }
    
    // Play Song button
    const playBtn = document.querySelector('button[onclick="playBirthdaySong()"]');
    if (playBtn) {
        playBtn.onclick = playBirthdaySong;
    }
    
    // Play/Pause button
    const toggleBtn = document.getElementById('playButton');
    if (toggleBtn) {
        toggleBtn.onclick = toggleBirthdaySong;
    }
    
    // Wish fountain
    const fountain = document.querySelector('.fountain');
    if (fountain) {
        fountain.onclick = generateWish;
    }
}

// ========== CELEBRATION FUNCTIONS ==========
function startCelebration() {
    console.log('Start celebration clicked');
    
    // Scroll to cake section
    const cakeSection = document.querySelector('.cake-section');
    if (cakeSection) {
        cakeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    
    // Create confetti
    createCelebration();
    
    // Play song after delay
    setTimeout(() => {
        playBirthdaySong();
    }, 1000);
}

function generateWish() {
    console.log('Generate wish clicked');
    
    const wishDisplay = document.getElementById('wishDisplay');
    if (!wishDisplay) return;
    
    const randomWish = birthdayWishes[Math.floor(Math.random() * birthdayWishes.length)];
    
    // Display wish
    wishDisplay.innerHTML = `<p class="comfortaa text-xl text-coral-pink font-semibold">${randomWish}</p>`;
    
    // Animate fountain
    const fountain = document.querySelector('.fountain');
    if (fountain) {
        fountain.style.transform = 'scale(1.1)';
        setTimeout(() => {
            fountain.style.transform = 'scale(1)';
        }, 300);
    }
    
    // Create confetti
    createCelebration();
}

// ========== VISUAL EFFECTS ==========
function createCelebration() {
    console.log('Creating celebration...');
    
    const colors = ['#FFD700', '#E8B4B8', '#F7E7CE', '#A8B5A0', '#F4C2C2'];
    
    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-20px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '9999';
            confetti.style.pointerEvents = 'none';
            confetti.style.boxShadow = '0 0 6px currentColor';
            
            document.body.appendChild(confetti);
            
            // Simple animation
            confetti.style.transition = 'all 2s ease-out';
            setTimeout(() => {
                confetti.style.transform = `translateY(${window.innerHeight + 100}px) rotate(${Math.random() * 360}deg)`;
                confetti.style.opacity = '0';
            }, 10);
            
            // Remove after animation
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.remove();
                }
            }, 2100);
        }, i * 50);
    }
}

function showBirthdayMessage() {
    console.log('Showing birthday message...');
    
    // Remove existing message if any
    const existing = document.querySelector('.birthday-message-overlay');
    if (existing) existing.remove();
    
    // Create message overlay
    const overlay = document.createElement('div');
    overlay.className = 'birthday-message-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        backdrop-filter: blur(4px);
    `;
    
    overlay.innerHTML = `
        <div style="
            background: white;
            padding: 2rem;
            border-radius: 1.5rem;
            text-align: center;
            max-width: 90%;
            width: 400px;
            transform: scale(0);
            transition: transform 0.3s ease-out;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        ">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎂</div>
            <h2 style="
                font-family: 'Quicksand', sans-serif;
                font-size: 2rem;
                color: #FFC857;
                margin-bottom: 1rem;
            ">Happy Birthday!</h2>
            <p style="
                font-family: 'Comfortaa', cursive;
                color: #4A4A4A;
                margin-bottom: 2rem;
                line-height: 1.5;
            ">
                I'm sending my own wish across all the distances —  
                for your joy, your success, and the moment I finally get to hug you again.  
                Every day with you is worth the wait. I love you 宝贝！
            </p>
            <button onclick="this.closest('.birthday-message-overlay').remove()" style="
                background: linear-gradient(to right, #FFC857, #FFE066);
                color: #4A4A4A;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 2rem;
                font-weight: bold;
                cursor: pointer;
                font-size: 1.1rem;
                transition: transform 0.3s;
            ">
                I Love You! 💕
            </button>
        </div>
    `;
    
    document.body.appendChild(overlay);
    
    // Animate in
    setTimeout(() => {
        const box = overlay.querySelector('div');
        if (box) {
            box.style.transform = 'scale(1)';
        }
    }, 10);
}

// ========== CAROUSEL ==========
function setupCarousel() {
    const carouselElement = document.getElementById('carousel');
    if (carouselElement && typeof Splide !== 'undefined') {
        try {
            new Splide('#carousel', {
                type: 'loop',
                perPage: 3,
                perMove: 1,
                gap: '1.5rem',
                autoplay: true,
                interval: 4000,
                pauseOnHover: true,
                breakpoints: {
                    768: { perPage: 1 },
                    1024: { perPage: 2 }
                }
            }).mount();
            console.log('Carousel initialized');
        } catch (error) {
            console.error('Carousel error:', error);
        }
    }
}

// ========== EXPORT FUNCTIONS ==========
window.startCelebration = startCelebration;
window.playBirthdaySong = playBirthdaySong;
window.toggleBirthdaySong = toggleBirthdaySong;
window.generateWish = generateWish;
window.blowOutCandles = blowOutCandles;
window.resetCandles = resetCandles;
