



// Slideshow
const slides = document.querySelectorAll('.slide');
const indicators = document.querySelectorAll('.indicator');
let currentSlide = 0;
let slideInterval;
const slideDuration = 4000;

// Initialize Slideshow
function initSlideshow() {
    // Set first slide as active
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');

    // Start the automatic slideshow
    startSlideshow();
}

// Start Automatic Slideshow
function startSlideshow() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, slideDuration);
}

// Go to Next Slide
function nextSlide() {
    // Remove active class from current slide
    slides[currentSlide].classList.remove('active');
    indicators[currentSlide].classList.remove('active');

    // Move to next slide
    currentSlide = (currentSlide + 1) % slides.length;

    // Add active class to new slide
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// Button Click Events
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', () => {
        alert('Exploring our architectural portfolio...');
    });
});

document.querySelectorAll('.btn-secondary').forEach(button => {
    button.addEventListener('click', () => {
        alert('Opening consultation form...');
    });
});

// Initialize on Load
window.addEventListener('load', () => {
    initSlideshow();

    // Start progress bar animation for first slide
    const firstProgress = indicators[0].querySelector('.indicator-progress');
    firstProgress.style.transition = `width ${slideDuration}ms linear`;
    firstProgress.style.width = '100%';
});

document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-number");
    const duration = 1500; // ⏱️ 10 seconds (milliseconds)

    counters.forEach(counter => {
        const target = +counter.getAttribute("data-target");
        let start = 0;
        const startTime = performance.now();

        const updateCount = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const currentValue = Math.floor(progress * target);
            counter.innerText = currentValue;

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                counter.innerText = target + "+";
            }
        };

        requestAnimationFrame(updateCount);
    });
});





// WhatsApp Chat Box
const whatsappToggle = document.getElementById('whatsappToggle');
const whatsappChatBox = document.getElementById('whatsappChatBox');
const closeChat = document.getElementById('closeChat');
const sendWhatsAppMessage = document.getElementById('sendWhatsAppMessage');
const whatsappMessageInput = document.getElementById('whatsappMessageInput');

if (whatsappToggle) {
    whatsappToggle.addEventListener('click', function () {
        whatsappChatBox.classList.toggle('active');
        whatsappMessageInput.focus();
    });
}

if (closeChat) {
    closeChat.addEventListener('click', function () {
        whatsappChatBox.classList.remove('active');
    });
}

// Send WhatsApp message
if (sendWhatsAppMessage) {
    sendWhatsAppMessage.addEventListener('click', sendWhatsApp);
}

if (whatsappMessageInput) {
    whatsappMessageInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            sendWhatsApp();
        }
    });
}

function sendWhatsApp() {
    const message = whatsappMessageInput.value.trim();
    if (message) {
        const phoneNumber = "9540674341"; // Replace with actual number
        const encodedMessage = encodeURIComponent(`Hello ARC Square Design Studio,\n\n${message}\n\n`);
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

        window.open(whatsappUrl, '_blank');
        whatsappMessageInput.value = '';
        whatsappChatBox.classList.remove('active');

        // Show confirmation
        if (typeof showNotification === 'function') {
            showNotification('Message prepared for WhatsApp!', 'success');
        }
    }
}











