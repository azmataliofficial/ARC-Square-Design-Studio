(function () {
  // ----- HERO SLIDER -----
  const slides = document.querySelectorAll(".slide");
  const prevBtn = document.getElementById("prevSlide");
  const nextBtn = document.getElementById("nextSlide");
  const dotsContainer = document.getElementById("dotsContainer");
  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoInterval;


  // create dots
  function createDots() {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalSlides; i++) {
      const dot = document.createElement("button");
      dot.classList.add("dot");
      if (i === currentSlide) dot.classList.add("active");
      dot.setAttribute("data-index", i);
      dot.addEventListener("click", function (e) {
        const idx = parseInt(e.target.getAttribute("data-index"));
        goToSlide(idx);
        resetTimer();
      });
      dotsContainer.appendChild(dot);
    }
  }

  function goToSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.remove("active");
    });
    slides[index].classList.add("active");
    currentSlide = index;
    document.querySelectorAll(".dot").forEach((dot, i) => {
      if (i === currentSlide) dot.classList.add("active");
      else dot.classList.remove("active");
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

  nextBtn.addEventListener("click", function () {
    nextSlide();
    resetTimer();
  });
  prevBtn.addEventListener("click", function () {
    prevSlide();
    resetTimer();
  });

  createDots();
  goToSlide(0);
  startAutoSlide();


  // get start button script
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".button");
    if (btn?.textContent.includes("Get Start")) {
      e.preventDefault();
      document
        .getElementById("services")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  });


  // ----- STATS ANIMATION -----
  const targetValues = {
    experience: 15,
    clients: 240,
    projects: 380,
    awards: 28,
  };

  const statExp = document.getElementById("statExp");
  const statClients = document.getElementById("statClients");
  const statProjects = document.getElementById("statProjects");
  const statAwards = document.getElementById("statAwards");

  function animateStats() {
    const duration = 2000;
    const steps = 60;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      const exp = Math.floor(targetValues.experience * progress);
      const clients = Math.floor(targetValues.clients * progress);
      const projects = Math.floor(targetValues.projects * progress);
      const awards = Math.floor(targetValues.awards * progress);

      statExp.innerText = exp + "+";
      statClients.innerText = clients + "+";
      statProjects.innerText = projects + "+";
      statAwards.innerText = awards + "+";

      if (step >= steps) {
        clearInterval(timer);
        statExp.innerText = targetValues.experience + "+";
        statClients.innerText = targetValues.clients + "+";
        statProjects.innerText = targetValues.projects + "+";
        statAwards.innerText = targetValues.awards + "+";
      }
    }, intervalTime);
  }

  window.addEventListener("load", animateStats);

})();

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".number");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.dataset.target;
          let start = 0;
          const duration = 1500;
          const startTime = performance.now();

          const update = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            counter.innerText = Math.floor(progress * target);
            progress < 1
              ? requestAnimationFrame(update)
              : (counter.innerText = target + "+");
          };

          requestAnimationFrame(update);
          observer.unobserve(counter);
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
});


// WhatsApp Chat Box
const whatsappToggle = document.getElementById("whatsappToggle");
const whatsappChatBox = document.getElementById("whatsappChatBox");
const closeChat = document.getElementById("closeChat");
const sendWhatsAppMessage = document.getElementById("sendWhatsAppMessage");
const whatsappMessageInput = document.getElementById("whatsappMessageInput");

if (whatsappToggle) {
  whatsappToggle.addEventListener("click", function () {
    whatsappChatBox.classList.toggle("active");
    whatsappMessageInput.focus();
  });
}

if (closeChat) {
  closeChat.addEventListener("click", function () {
    whatsappChatBox.classList.remove("active");
  });
}

if (sendWhatsAppMessage) {
  sendWhatsAppMessage.addEventListener("click", sendWhatsApp);
}

if (whatsappMessageInput) {
  whatsappMessageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendWhatsApp();
    }
  });
}

function sendWhatsApp() {
  const message = whatsappMessageInput.value.trim();
  if (message) {
    const phoneNumber = "9540674341";
    const encodedMessage = encodeURIComponent(
      `Hello ARC Square Design Studio,\n\n${message}\n\n`,
    );
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    whatsappMessageInput.value = "";
    whatsappChatBox.classList.remove("active");

    if (typeof showNotification === "function") {
      showNotification("Message prepared for WhatsApp!", "success");
    }
  }
}



// Service Cards Pop-up Script
let popsec = document.getElementById("pop-sec");
let cardbtn = document.querySelectorAll(".learn-more");
let closebtn = document.getElementById("close-pop");

function openpop() {
  popsec.style.opacity = "1";
  popsec.style.visibility = "visible";
}

cardbtn.forEach((btn) => {
  btn.addEventListener("click", openpop);
});

closebtn.addEventListener("click", function () {
  popsec.style.opacity = "0";
  popsec.style.visibility = "hidden";
});



// Projects Tabs script
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".pro-tab");

  tabs.forEach((tab) => {
    tab.addEventListener("click", function () {

      tabs.forEach((t) => t.classList.remove("active"));

      this.classList.add("active");

      let category = this.getAttribute("data-category");

      let cards = document.querySelectorAll(".pro-card");

      cards.forEach((card) => {
        if (
          category === "all" ||
          card.getAttribute("data-category") === category
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
});


// likes function
function loadLikes() {
  let savedLikes = localStorage.getItem("projectLikes");

  if (savedLikes) {
    return JSON.parse(savedLikes);
  } else {
    return {};
  }
}

function saveLikes(likes) {
  localStorage.setItem("projectLikes", JSON.stringify(likes));
}

document.addEventListener("DOMContentLoaded", function () {
  let likeButtons = document.querySelectorAll(".like-btn");
  let likes = loadLikes();

  likeButtons.forEach((btn, index) => {
    let countSpan = btn.querySelector(".like-count");
    let icon = btn.querySelector("i");

    let card = btn.closest(".pro-card");
    let cardId = card.getAttribute("data-id");

    if (!cardId) {
      cardId = "card-" + index;
      card.setAttribute("data-id", cardId);
    }

    if (likes[cardId]) {
      countSpan.textContent = likes[cardId].count;

      if (likes[cardId].liked) {
        btn.classList.add("liked");
        icon.className = "fa-solid fa-heart";
      } else {
        btn.classList.remove("liked");
        icon.className = "fa-regular fa-heart";
      }
    } else {
      countSpan.textContent = "0";
      likes[cardId] = { count: 0, liked: false };
    }
  });

  saveLikes(likes);
});


// Like button toggle function
function toggleLike(button) {
  let icon = button.querySelector("i");
  let countSpan = button.querySelector(".like-count");
  let count = parseInt(countSpan.textContent);

  let card = button.closest(".pro-card");
  let cardId = card.getAttribute("data-id");

  let likes = loadLikes();

  if (button.classList.contains("liked")) {
    icon.className = "fa-regular fa-heart";
    count--;
    button.classList.remove("liked");

    likes[cardId] = { count: count, liked: false };
  } else {
    icon.className = "fa-solid fa-heart";
    count++;
    button.classList.add("liked");

    likes[cardId] = { count: count, liked: true };

    icon.style.animation = "heartBeat 0.3s ease";
    setTimeout(() => {
      icon.style.animation = "";
    }, 300);
  }

  countSpan.textContent = count;

  saveLikes(likes);
}



// Pinterest-like Masonry Grid for Gallery Section
(function () {
  const pins = [
    {
      img: "https://images.pexels.com/photos/1767434/pexels-photo-1767434.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop",
      title: "coastal whisper",
      cat: "seascape",
    },
    {
      img: "https://images.pexels.com/photos/1486974/pexels-photo-1486974.jpeg?auto=compress&cs=tinysrgb&w=600&h=700&fit=crop",
      title: "urban layers",
      cat: "architecture",
    },
    {
      img: "https://images.pexels.com/photos/1128795/pexels-photo-1128795.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop",
      title: "golden hour",
      cat: "portrait",
    },
    {
      img: "https://images.pexels.com/photos/2896387/pexels-photo-2896387.jpeg?auto=compress&cs=tinysrgb&w=600&h=950&fit=crop",
      title: "verdant dreams",
      cat: "nature",
    },
    {
      img: "https://images.pexels.com/photos/2570064/pexels-photo-2570064.jpeg?auto=compress&cs=tinysrgb&w=600&h=600&fit=crop",
      title: "minimal mood",
      cat: "still life",
    },
    {
      img: "https://images.pexels.com/photos/3785708/pexels-photo-3785708.jpeg?auto=compress&cs=tinysrgb&w=600&h=850&fit=crop",
      title: "street rhythm",
      cat: "urban",
    },
    {
      img: "https://images.pexels.com/photos/2101187/pexels-photo-2101187.jpeg?auto=compress&cs=tinysrgb&w=600&h=720&fit=crop",
      title: "abstract light",
      cat: "experimental",
    },
    {
      img: "https://images.pexels.com/photos/2085126/pexels-photo-2085126.jpeg?auto=compress&cs=tinysrgb&w=600&h=750&fit=crop",
      title: "wild textures",
      cat: "macro",
    },
    {
      img: "https://images.pexels.com/photos/3225517/pexels-photo-3225517.jpeg?auto=compress&cs=tinysrgb&w=600&h=980&fit=crop",
      title: "ethereal waves",
      cat: "fine art",
    },
    {
      img: "https://images.pexels.com/photos/102127/pexels-photo-102127.jpeg?auto=compress&cs=tinysrgb&w=600&h=820&fit=crop",
      title: "morning fog",
      cat: "landscape",
    },
    {
      img: "https://images.pexels.com/photos/1229042/pexels-photo-1229042.jpeg?auto=compress&cs=tinysrgb&w=600&h=670&fit=crop",
      title: "neon blur",
      cat: "street",
    },
    {
      img: "https://images.pexels.com/photos/1689731/pexels-photo-1689731.jpeg?auto=compress&cs=tinysrgb&w=600&h=900&fit=crop",
      title: "desert solitude",
      cat: "travel",
    },
    {
      img: "https://images.pexels.com/photos/2774197/pexels-photo-2774197.jpeg?auto=compress&cs=tinysrgb&w=600&h=720&fit=crop",
      title: "pastel dreams",
      cat: "still life",
    },
    {
      img: "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=600&h=1050&fit=crop",
      title: "floral whisper",
      cat: "macro",
    },
    {
      img: "https://images.pexels.com/photos/1181534/pexels-photo-1181534.jpeg?auto=compress&cs=tinysrgb&w=600&h=630&fit=crop",
      title: "clean lines",
      cat: "minimal",
    },
  ];

  const grid = document.getElementById("pinterestGrid");

  for (let i = 0; i < pins.length; i++) {
    const item = pins[i];

    const figure = document.createElement("figure");
    const img = document.createElement("img");
    const figCaption = document.createElement("figcaption");

    img.src = item.img;
    img.alt = `${item.title} – ${item.cat}`;
    img.loading = "lazy";

    figCaption.innerHTML = `<strong>${item.title}</strong><span>${item.cat}</span>`;

    figure.appendChild(img);
    figure.appendChild(figCaption);

    grid.appendChild(figure);
  }
})();
