(function () {
    // ----- HERO SLIDER -----
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const dotsContainer = document.getElementById('dotsContainer');
    let currentSlide = 0;
    const totalSlides = slides.length;
    let autoInterval;

    // create dots
    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('button');
            dot.classList.add('dot');
            if (i === currentSlide) dot.classList.add('active');
            dot.setAttribute('data-index', i);
            dot.addEventListener('click', function (e) {
                const idx = parseInt(e.target.getAttribute('data-index'));
                goToSlide(idx);
                resetTimer();
            });
            dotsContainer.appendChild(dot);
        }
    }

    function goToSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
        });
        slides[index].classList.add('active');
        currentSlide = index;
        // update dots
        document.querySelectorAll('.dot').forEach((dot, i) => {
            if (i === currentSlide) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function nextSlide() {
        let next = (currentSlide + 1) % totalSlides;
        goToSlide(next);
    }

    function prevSlide() {
        let prev = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prev);
    }

    function startAutoSlide() {
        autoInterval = setInterval(nextSlide, 5000);
    }

    function resetTimer() {
        clearInterval(autoInterval);
        startAutoSlide();
    }

    // event listeners
    nextBtn.addEventListener('click', function () {
        nextSlide();
        resetTimer();
    });
    prevBtn.addEventListener('click', function () {
        prevSlide();
        resetTimer();
    });

    // init dots and first slide active
    createDots();
    goToSlide(0);   // ensure first active
    startAutoSlide();

    // ----- STATS COUNTER (like React useEffect) -----
    const targetValues = {
        experience: 15,
        clients: 240,
        projects: 380,
        awards: 28
    };

    const statExp = document.getElementById('statExp');
    const statClients = document.getElementById('statClients');
    const statProjects = document.getElementById('statProjects');
    const statAwards = document.getElementById('statAwards');

    function animateStats() {
        const duration = 2000; // 2 sec
        const steps = 60;
        const intervalTime = duration / steps;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            const progress = step / steps; // 0 to 1

            // current values (floor)
            const exp = Math.floor(targetValues.experience * progress);
            const clients = Math.floor(targetValues.clients * progress);
            const projects = Math.floor(targetValues.projects * progress);
            const awards = Math.floor(targetValues.awards * progress);

            statExp.innerText = exp + '+';
            statClients.innerText = clients + '+';
            statProjects.innerText = projects + '+';
            statAwards.innerText = awards + '+';

            if (step >= steps) {
                clearInterval(timer);
                // set final exact values with '+'
                statExp.innerText = targetValues.experience + '+';
                statClients.innerText = targetValues.clients + '+';
                statProjects.innerText = targetValues.projects + '+';
                statAwards.innerText = targetValues.awards + '+';
            }
        }, intervalTime);
    }

    // start stats counter when page loads (you can also trigger when visible, but simple)
    window.addEventListener('load', animateStats);

    // (optional: re-run if needed but once is enough)
    // for beginners: stats start counting on load just like react useEffect with empty deps.
})();







document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".stat-number");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.dataset.target;
                let start = 0;
                const duration = 1500;
                const startTime = performance.now();

                const update = (currentTime) => {
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    counter.innerText = Math.floor(progress * target);
                    progress < 1 ? requestAnimationFrame(update) : counter.innerText = target + "+";
                };

                requestAnimationFrame(update);
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
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
