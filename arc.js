const sections = document.querySelectorAll(".slide-sec");
const navLinks = document.querySelectorAll(".nav-link");

function updateActivelinks() {
  const scroll = window.scrollY
  let current = ''

  sections.forEach((section) => {
    const top = section.offsetTop
    const height = section.clientHeight

    if (scroll >= top - 300 && scroll < top + height - 300) {
      current = section.id
    }
  })

  if (scroll < 100) {
    current = 'home'
  }
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section == current)
  })
}

window.addEventListener('scroll', updateActivelinks);
window.addEventListener('load', updateActivelinks);



// for mobile menu button
document.addEventListener("DOMContentLoaded", function () {
  let btn = document.querySelector(".mobile-menu-btn");
  let menu = document.querySelector(".nav-links");

  if (btn && menu) {
    let overlay = document.createElement("div");
    overlay.className = "nav-overlay";
    document.body.appendChild(overlay);

    btn.onclick = function (event) {
      event.stopPropagation(); // Important: event ko rokta hai
      menu.classList.toggle("active");
      overlay.classList.toggle("active");

      let icon = btn.querySelector("i");
      if (menu.classList.contains("active")) {
        icon.className = "fas fa-times";
        document.body.style.overflow = "hidden";
      } else {
        icon.className = "fas fa-bars";
        document.body.style.overflow = "";
      }
    };

    document.addEventListener("click", function (event) {
      if (menu.classList.contains("active")) {
        if (!menu.contains(event.target) && !btn.contains(event.target)) {
          closeMenu();
        }
      }
    });

    overlay.addEventListener("click", function () {
      closeMenu();
    });

    // **Target container jahan click karne se menu close ho jayega**
    let targetContainer = document.querySelector("#nav-links"); // Yahan apna container selector daalein

    if (targetContainer) {
      targetContainer.addEventListener("click", function (event) {
        if (menu.classList.contains("active")) {
          closeMenu();
        }
      });
    }

    function closeMenu() {
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";

      let icon = btn.querySelector("i");
      if (icon) icon.className = "fas fa-bars";
    }

    window.onresize = function () {
      if (window.innerWidth > 768) {
        closeMenu();
      }
    };
  }
});


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
const sendMessage = document.getElementById("send-Message");
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

if (sendMessage) {
  sendMessage.addEventListener("click", sendWhatsApp);
}

if (whatsappMessageInput) {
  whatsappMessageInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendWhatsApp();
    }
  });
}

function getTime() {
  let d = new Date();
  h = d.getHours();
  m = d.getMinutes();
  am = h >= 12 ? 'PM' : 'AM';
  h = h % 12 || 12;
  return `${h}:${m < 10 ? '0' + m : m} ${am}`;
}
document.getElementById("receivedTime").textContent = getTime();
setInterval(() => {
  document.getElementById("receivedTime").textContent = getTime();
}, 60000);

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



// service section cards

let serCardDetails = [
  {
    mainImage: "images/Architect main.jpg",
    cardCategory: "Architecture",
    cardTittle: "Modern Architect",
    cardDecription: "We design modern homes, villas, offices, shops, and showrooms that look beautiful and work perfectly for your needs. Our team plans every detail carefully – from the way rooms connect to how sunlight enters your space. We create buildings that stand strong, look impressive, and make you feel proud. Whether you want a cozy home or a grand commercial space, we turn your ideas into real structures that match your lifestyle and budget.",
    gallaryimg1: "images/Architect 1.jpg",
    gallaryimg2: "images/Architect 2.jpg",
    gallaryimg3: "images/Architect 3.jpg"
  },
  {
    mainImage: "images/interior main.jpg",
    cardCategory: "Interior Design",
    cardTittle: "Modern Drawing Area",
    cardDecription: "We transform empty spaces into beautiful, comfortable rooms where you'll love spending time. For homes and villas, we create warm, personal spaces that reflect your style. For offices, shops, and showrooms, we design smart layouts that impress customers and help your business grow. We handle everything – wall colors, furniture, lighting, and decorations – to make your space both stylish and functional.",
    gallaryimg1: "images/interior 1.jpg",
    gallaryimg2: "images/interior 2.jpg",
    gallaryimg3: "images/interior 3.jpg"
  },
  {
    mainImage: "images/Exterior main.jpg",
    cardCategory: "Exterior Design",
    cardTittle: "Commercial Villa",
    cardDecription: "We make the outside of your building look stunning and welcoming. For modern homes and villas, we create beautiful facades, elegant entrances, and attractive outdoor areas. For offices, shops, and showrooms, we design exteriors that catch people's attention and make your business stand out. We work with materials, colors, and lighting to give your building a personality that impresses everyone who sees it.",
    gallaryimg1: "images/Exterior 1.jpg",
    gallaryimg2: "images/Exterior 2.jpg",
    gallaryimg3: "images/Exterior 3.jpg"
  },
  {
    mainImage: "images/Planning main.jpg",
    cardCategory: "Planning",
    cardTittle: "Home Planning",
    cardDecription: "Before we build anything, we create smart plans that save you time and money. We study your space carefully and design layouts that make the best use of every square foot. For homes and villas, we ensure smooth movement between rooms. For offices, shops, and showrooms, we plan spaces that improve work flow and customer experience. Good planning means fewer problems later and a space that truly works for you.",
    gallaryimg1: "images/Planning 1.jpg",
    gallaryimg2: "images/Planning 2.jpg",
    gallaryimg3: "images/Planning 3.jpg"
  },
  {
    mainImage: "images/2D main.jpg",
    cardCategory: "2D Modeling",
    cardTittle: "Villa Drawing",
    cardDecription: "We create detailed drawings that show exactly how your project will look and work. These floor plans, elevations, and layouts help you understand every room's size, door positions, window placements, and more. For homes and villas, we map out your perfect living space. For offices, shops, and showrooms, we plan efficient layouts. These 2D designs are your project's roadmap – clear, simple, and easy to follow.",
    gallaryimg1: "images/2D 1.jpg",
    gallaryimg2: "images/2D 2.jpg",
    gallaryimg3: "images/2D 3.jpg"
  },
  {
    mainImage: "images/3D main.jpg",
    cardCategory: "3D Modeling",
    cardTittle: "Modern 3D Villa",
    cardDecription: "We bring your project to life with realistic 3D models that let you see your finished space before we start building. You can walk through your future home, villa, office, shop, or showroom on screen. See how colors look together, how furniture fits, and how light moves through rooms. This helps you make changes easily and feel confident about your decisions. What you imagine, we show you in stunning detail.",
    gallaryimg1: "images/3D 1.jpg",
    gallaryimg2: "images/3D 2.jpg",
    gallaryimg3: "images/3D 3.jpg"
  },
]


for (let cards = 0; cards < serCardDetails.length; cards++) {
  const element = serCardDetails[cards];
  let mainContainer = document.getElementById("ser-grid-cont");

  // each button gets a data-index so we know which card was clicked
  mainContainer.innerHTML += `
                 <div class="card">
                   <div  class="image">
                        <img
                            src="${element.mainImage}"
                            alt="Modern Living Room with Natural Light" loading="lazy">
                        <div class="overlay" id="card-over"></div>
                        <div class="content" id="card-cont">
                            <span>${element.cardCategory}</span>
                            <h2>${element.cardTittle}</h2>
                        </div>
                    </div>
                    <div class="content">
                        <p class="description">
                           ${element.cardDecription}
                        </p>
                        <button class="learn-more" data-index="${cards}" aria-label="Learn more about Modern Living Room design">
                            Learn More
                        </button>
                    </div>
                 </div>
                `;
}





let popsec = document.getElementById("pop-sec");
let closebtn = document.getElementById("close-pop");
let body = document.querySelector('body');


const cardbtn = document.querySelectorAll(".learn-more");
cardbtn.forEach((btn) => {
  const idx = parseInt(btn.getAttribute("data-index"), 10);
  btn.addEventListener("click", () => openpop(idx));
});


function openpop(index) {
  const detail = serCardDetails[index];
  if (!detail) return;

  popsec.innerHTML = `
              <div class="conta">
                <div class="uper-part">
                    <img src="${detail.mainImage}"
                        alt="${detail.cardTittle}">
                    <div class="closE-btn">
                        <i id="close-pop" class="fa-solid fa-xmark"></i>
                    </div>
                </div>
                <div class="lower-part">
                    <div class="cont">
                        <span>${detail.cardCategory}</span>
                        <h2>${detail.cardTittle}</h2>
                        <p>${detail.cardDecription}</p>
                    </div>
                    <div class="gallery">
                        <h3>Gallery</h3>
                        <div class="images">
                            <img src="${detail.gallaryimg1}"
                                alt="">
                            <img src="${detail.gallaryimg2}"
                                alt="">
                            <img src="${detail.gallaryimg3}"
                                alt="">
                        </div>
                    </div>
                </div>
            </div>`;

  popsec.style.opacity = "1";
  popsec.style.visibility = "visible";
  body.style.overflow = "hidden";

  const innerClose = popsec.querySelector("#close-pop");
  if (innerClose) {
    innerClose.addEventListener("click", () => {
      popsec.style.opacity = "0";
      popsec.style.visibility = "hidden";
      body.style.overflow = "auto";
    });
  }

  // hide popup when clicking outside content
  popsec.addEventListener('click', e => {
    if (e.target === popsec) {
      popsec.style.opacity = "0";
      popsec.style.visibility = "hidden";
      body.style.overflow = "auto";
    }
  });

}

