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













// Projects Tabs script
// tabs funtions
document.addEventListener('DOMContentLoaded', function () {
    // Sab tabs ko select karo
    const tabs = document.querySelectorAll('.pro-tab');

    // Har tab ke liye event listener add karo
    tabs.forEach(tab => {
        tab.addEventListener('click', function () {
            // Pehle saare tabs se active class hatao
            tabs.forEach(t => t.classList.remove('active'));

            // Is tab ko active banao
            this.classList.add('active');

            // Category lo jis par click kiya
            let category = this.getAttribute('data-category');

            // Saare cards lo
            let cards = document.querySelectorAll('.pro-card');

            // Har card ko check karo
            cards.forEach(card => {
                // Agar category 'all' hai ya card ki category match karti hai
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';  // Dikhado
                } else {
                    card.style.display = 'none';   // Chhupao
                }
            });
        });
    });
});


// likes function
function loadLikes() {
    // Check karo localStorage mein likes hain ya nahi
    let savedLikes = localStorage.getItem('projectLikes');

    if (savedLikes) {
        // Agar hain to use karo
        return JSON.parse(savedLikes);
    } else {
        // Nahin hain to empty object banao
        return {};
    }
}

// Likes ko localStorage mein save karo
function saveLikes(likes) {
    localStorage.setItem('projectLikes', JSON.stringify(likes));
}

// Jab page load ho to likes set karo
document.addEventListener('DOMContentLoaded', function () {
    // Saare like buttons lo
    let likeButtons = document.querySelectorAll('.like-btn');
    let likes = loadLikes();  // Saved likes lo

    // Har button ke liye
    likeButtons.forEach((btn, index) => {
        let countSpan = btn.querySelector('.like-count');
        let icon = btn.querySelector('i');

        // Har card ko unique ID do (agar nahi hai to)
        let card = btn.closest('.pro-card');
        let cardId = card.getAttribute('data-id');

        // Agar card ID nahi hai to bana do
        if (!cardId) {
            cardId = 'card-' + index;
            card.setAttribute('data-id', cardId);
        }

        // Check karo is card ka like saved hai ya nahi
        if (likes[cardId]) {
            // Saved like hai to set karo
            countSpan.textContent = likes[cardId].count;

            if (likes[cardId].liked) {
                btn.classList.add('liked');
                icon.className = 'fa-solid fa-heart';
            } else {
                btn.classList.remove('liked');
                icon.className = 'fa-regular fa-heart';
            }
        } else {
            // Naya card hai to default 0
            countSpan.textContent = '0';
            likes[cardId] = { count: 0, liked: false };
        }
    });

    // Save karo
    saveLikes(likes);
});

// Like button toggle function
function toggleLike(button) {
    // Icon aur count lo
    let icon = button.querySelector('i');
    let countSpan = button.querySelector('.like-count');
    let count = parseInt(countSpan.textContent);

    // Card ka ID lo
    let card = button.closest('.pro-card');
    let cardId = card.getAttribute('data-id');

    // Saare likes lo localStorage se
    let likes = loadLikes();

    // Check karo liked hai ya nahi
    if (button.classList.contains('liked')) {
        // Unlike karo
        icon.className = 'fa-regular fa-heart';
        count--;
        button.classList.remove('liked');

        // Save karo
        likes[cardId] = { count: count, liked: false };
    } else {
        // Like karo
        icon.className = 'fa-solid fa-heart';
        count++;
        button.classList.add('liked');

        // Save karo
        likes[cardId] = { count: count, liked: true };

        // Heart beat animation
        icon.style.animation = 'heartBeat 0.3s ease';
        setTimeout(() => {
            icon.style.animation = '';
        }, 300);
    }

    // Count update karo
    countSpan.textContent = count;

    // localStorage mein save karo
    saveLikes(likes);
}

















// images like pintrest theme
(function () {
    const pins = [
        { img: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop", title: "coastal whisper", cat: "seascape" },
        { img: "https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop", title: "urban layers", cat: "architecture" },
        { img: "https://images.pexels.com/photos/1128795/pexels-photo-1128795.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop", title: "golden hour", cat: "portrait" },
        { img: "https://images.pexels.com/photos/2896387/pexels-photo-2896387.jpeg?auto=compress&cs=tinysrgb&w=600&h=950&fit=crop", title: "verdant dreams", cat: "nature" },
        { img: "https://images.pexels.com/photos/2570064/pexels-photo-2570064.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop", title: "minimal mood", cat: "still life" },
        { img: "https://images.pexels.com/photos/3785708/pexels-photo-3785708.jpeg?auto=compress&cs=tinysrgb&w=600&h=850&fit=crop", title: "street rhythm", cat: "urban" },
        { img: "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=600&h=720&fit=crop", title: "abstract light", cat: "experimental" },
        { img: "https://images.pexels.com/photos/2085126/pexels-photo-2085126.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop", title: "wild textures", cat: "macro" },
        { img: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600&h=980&fit=crop", title: "ethereal waves", cat: "fine art" },
        { img: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=600&h=820&fit=crop", title: "morning fog", cat: "landscape" },
        { img: "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=600&h=670&fit=crop", title: "neon blur", cat: "street" },
        { img: "https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop", title: "desert solitude", cat: "travel" },
        { img: "https://images.pexels.com/photos/2774197/pexels-photo-2774197.jpeg?auto=compress&cs=tinysrgb&w=600&h=720&fit=crop", title: "pastel dreams", cat: "still life" },
        { img: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=600&h=1050&fit=crop", title: "floral whisper", cat: "macro" }, 
        { img: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=600&h=630&fit=crop", title: "clean lines", cat: "minimal" }
    ];

    const grid = document.getElementById('pinterestGrid');

    // loop through pins and build <figure> cards
    for (let i = 0; i < pins.length; i++) {
        const item = pins[i];

        // create elements
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figCaption = document.createElement('figcaption');

        // set image attributes
        img.src = item.img;
        img.alt = `${item.title} – ${item.cat}`;
        img.loading = 'lazy';   // better performance

        // fill caption
        figCaption.innerHTML = `<strong>${item.title}</strong><span>${item.cat}</span>`;

        // assemble
        figure.appendChild(img);
        figure.appendChild(figCaption);

        // append to masonry grid
        grid.appendChild(figure);
    }
})();