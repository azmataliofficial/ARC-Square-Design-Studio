// create a STATE object for all api response data hendale

const STATE = {
  data: {
    testimonialData: [],
    serviceData:[],
    projectCardDetails: [],
    galleryData: []
  },
}


// fetching all data 

async function fetchingData() {
  try {
    const API_URL = './arc.json'
    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error(`HTTP network error! Status code ${response.status}`)
    }

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, 2000)
    })

    let allData = await response.json()

    STATE.data = {
      testimonialData: allData.testimonialData,
      serviceData : allData.serviceData,
      projectCardDetails: allData.projectCardDetails,
      galleryData: allData.galleryData
    }


  } catch (error) {
    console.log(error);
  }
  finally {
  }
}

async function init() {
  await fetchingData()
  startTestimonialRotation()
  renderProject()
  attachProjectCardListeners()
  renderGallery()
}




// Navbaar Items script
document.addEventListener("DOMContentLoaded", function () {
  let navContaners = document.querySelectorAll(".slide-sec")
  let navItems = document.querySelectorAll(".link")

  navContaners.forEach((cont) => {
    if (cont.id !== "home") {
      cont.style.display = "none"
    } else {
      cont.style.display = "block"
    }
  })

  function showSection(sectionId) {
    navContaners.forEach((cont) => {
      if (cont.id == sectionId) {
        cont.style.display = "block"
        setTimeout(() => {
          cont.style.opacity = "1"
        }, 100)
      } else {
        cont.style.opacity = "0"
        setTimeout(() => {
          cont.style.display = "none"
        }, 300)
      }
    })

    navItems.forEach((link) => {
      if (link.dataset.section === sectionId) {
        link.classList.add('active')
      } else {
        link.classList.remove('active')
      }
    })
  }

  navItems.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      let sectionId = this.dataset.section;
      showSection(sectionId)
      menuBaar.style.transform = "rotate(0deg)"
      navLinkCont.style.maxHeight = "0px"

      const section = document.getElementById(sectionId)
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" })
        menuBaar.style.transform = "rotate(0deg)"
        navLinkCont.style.maxHeight = "0px"
      }
    })
  })

  window.addEventListener("popstate", function () {
    const hash = window.location.hash.substring(1) || 'home'
    showSection(hash)
  })

  if (!window.location.hash) {
    window.location.hash = "#home"
  }

})

function scrollToSection(sectionId) {
  let navContaners = document.querySelectorAll(".slide-sec")
  let navItems = document.querySelectorAll(".link")


  navContaners.forEach(cont => {
    if (cont.id === sectionId) {
      cont.style.display = "block"
      cont.style.opacity = "1"
    } else {
      cont.style.display = "none"
    }
  })

  navItems.forEach(link => {
    link.classList.toggle("active", link.dataset.section === sectionId)
  })

  window.location.hash = sectionId

  let element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: "smooth" })
  }
}


// Mobile menu script

let menuBaar = document.getElementById("mobile-menu-btn")
let navLinkCont = document.getElementById("nav-links")
let isOpen = false


let navbItems = document.querySelectorAll("#nav-links button")

navbItems.forEach((link) => {
  link.addEventListener("click", function () {
    if (window.innerWidth <= 768) {
      navLinkCont.style.maxHeight = "0px"
      menuBaar.style.transform = "rotate(0deg)"
      navLinkCont.style.padding = "0px"
      isOpen = false
    }
  })
})

function initializeMenu() {
  if (window.innerWidth <= 768) {
    navLinkCont.style.maxHeight = "0px"
    isOpen = false
  } else {
    navLinkCont.style.maxHeight = "none"
    isOpen = true
  }
}


function toggleMenu() {
  if (!isOpen) {
    menuBaar.style.transform = "rotate(90deg)"
    navLinkCont.style.maxHeight = "400px"
    navLinkCont.style.padding = "20px 0px"
    isOpen = true
  } else {
    menuBaar.style.transform = "rotate(0deg)"
    navLinkCont.style.maxHeight = "0px"
    navLinkCont.style.padding = "0px"
    isOpen = false
  }
}

window.addEventListener("load", initializeMenu)

window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    navLinkCont.style.maxHeight = "0px"
    navLinkCont.style.padding = "0px"
    isOpen = false
  } else {
    navLinkCont.style.maxHeight = "none"
    isOpen = true
  }
});
// navbaar end


// Hero Slider start


const slidesData = [
  {
    "image": "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "title": "Modern Interior Design",
    "description": "Designed with modern aesthetics in mind",
    "buttonText": "Get Started",
    "buttonLink": "contact"
  },
  {
    "image": "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "title": "Stunning Exterior Design",
    "description": "Architecture that inspires",
    "buttonText": "Explore Images",
    "buttonLink": "gallery"
  },
  {
    "image": "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920",
    "title": "Modern Living Spaces",
    "description": "Where architecture meets comfort",
    "buttonText": "View Projects",
    "buttonLink": "projects"
  }
]



let wrapper = document.getElementById('slideswrapper')
let prevbtn = document.getElementById('prevSlide')
let nextbtn = document.getElementById('nextSlide')
let dotsContainer = document.getElementById('dotsContainer');
let current = 0
let timer;


slidesData.forEach((data, index) => {
  const slide = document.createElement('div')
  slide.className = 'slide'
  slide.style.backgroundImage = `url('${data.image}')`
  slide.innerHTML = ` <div class="content">
                            <h1>${data.title}</h1>
                            <p>${data.description}</p>
                            <button style="--clr: #7808d0" onclick="scrollToSection('${data.buttonLink}')"
                                style="text-decoration: none;"> 
                                <span class="btn-icon">
                                    <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        class="btn-svg" width="10">
                                        <path
                                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                            fill="currentColor"></path>
                                    </svg>

                                    <svg viewBox="0 0 14 15" fill="none" width="10" xmlns="http://www.w3.org/2000/svg"
                                        class="btn-svg btn-svg-copy">
                                        <path
                                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                            fill="currentColor"></path>
                                    </svg>
                                </span>
                              ${data.buttonText}
                            </button>
                      </div> `
  wrapper.appendChild(slide)


  let dot = document.createElement('button')
  dot.className = 'dot'
  dot.onclick = () => goTo(index)
  dotsContainer.appendChild(dot)
})



function update() {
  document.querySelectorAll('.slide').forEach((s, i) => {
    s.classList.toggle('active', i === current)
  })
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active-dot', i === current)
  })
}

function nextSlide() { current = (current + 1) % slidesData.length; update(); resetTimer(); }
function prevSlide() { current = (current - 1 + slidesData.length) % slidesData.length; update(); resetTimer(); }
function goTo(i) { current = i; update(); resetTimer(); }

function startAuto() { timer = setInterval(nextSlide, 6000); }
function stopAuto() { clearInterval(timer); }
function resetTimer() { stopAuto(); startAuto(); }

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('slide-btn')) {
    const link = e.target.dataset.link;
    const target = document.querySelector(link);
    target ? target.scrollIntoView({ behavior: 'smooth' }) : alert(`Clicked: ${e.target.innerText}`);
  }
});


document.onkeydown = (e) => {
  if (e.key === 'ArrowLeft') { prevSlide(); e.preventDefault(); }
  if (e.key === 'ArrowRight') { nextSlide(); e.preventDefault(); }
};

prevbtn.onclick = prevSlide;
nextbtn.onclick = nextSlide;

update();
startAuto();

// Hero Slider end


// Stats Animation start
window.addEventListener("load", function () {
  const stats = [
    { el: document.getElementById("statExp"), target: 15 },
    { el: document.getElementById("statClients"), target: 240 },
    { el: document.getElementById("statProjects"), target: 380 },
    { el: document.getElementById("statAwards"), target: 28 }
  ];

  let step = 0;
  const steps = 60;
  const timer = setInterval(() => {
    step++;
    stats.forEach(({ el, target }) => {
      el.innerText = Math.floor(target * (step / steps)) + "+";
    });

    if (step >= steps) {
      clearInterval(timer);
      stats.forEach(({ el, target }) => el.innerText = target + "+");
    }
  }, 2000 / steps);
});

document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = +el.dataset.target;
      const start = performance.now();

      const animate = (now) => {
        const progress = Math.min((now - start) / 1500, 1);
        el.innerText = Math.floor(progress * target) + (progress < 1 ? '' : '+');
        progress < 1 && requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".number").forEach(el => observer.observe(el));
});

// Stats Animation end




// testimonial start

let currentTestimonialIndex = 0;

function renderTestimonials() {
  const grid = document.querySelector('.grid-cont');
  if (!STATE.data.testimonialData.length) return;

  grid.innerHTML = '';

  for (let i = 0; i < 2; i++) {
    const itemIndex = (currentTestimonialIndex + i) % STATE.data.testimonialData.length;
    const item = STATE.data.testimonialData[itemIndex];

    const delay = i * 0.2;

    let stars = '';
    const fullStars = Math.floor(item.rating);
    const hasHalfStar = item.rating % 1 !== 0;
    for (let j = 0; j < fullStars; j++) {
      stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalfStar) {
      stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const card = `
      <div class="card" style="animation-delay: ${delay}s;">
        <div class="header">
          <div class="avatar">${item.avatar}</div>
          <div class="info">
            <h3>${item.clientName}</h3>
            <p><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
          </div>
        </div>
        <div class="content">
          <div class="rating">${stars} <span>${item.rating}</span></div>
          <div class="text">${item.text}</div>
        </div>
        <div class="meta">
          <span class="tag"><i class="fas fa-tag"></i> ${item.projectType}</span>
          <a href="${item.instagram}"  target="_blank" rel="noopener noreferrer" class="instagram-tag">
          <i class="fab fa-instagram"></i>${item.instaId}</a>
        </div>
      </div>
    `;
    grid.innerHTML += card;
  }
}

function startTestimonialRotation() {
  const grid = document.querySelector('.grid-cont');
  if (!STATE.data.testimonialData.length) return;

  renderTestimonials();

  setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 2) % STATE.data.testimonialData.length;
    renderTestimonials();
  }, 5000);
}

// testimonial end



// faq start
document.querySelectorAll('.tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.tab').forEach(function (t) {
      t.classList.remove('active');
    });

    document.querySelectorAll('.panel').forEach(function (p) {
      p.classList.remove('active');
    });

    this.classList.add('active');

    let catId = this.getAttribute('data-cat');
    document.querySelector('.panel[data-panel="' + catId + '"]').classList.add('active');
  });
});
document.querySelectorAll('.question').forEach(function (question) {
  question.addEventListener('click', function () {
    let currentItem = this.closest('.item');
    let panel = currentItem.closest('.panel');
    panel.querySelectorAll('.item').forEach(function (item) {
      if (item !== currentItem) {
        item.classList.remove('open');
      }
    });
    currentItem.classList.toggle('open');
  });
});

// faq end



// WhatsApp Chat Box start

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

// WhatsApp Chat Box end

// service section

let activeCategoryIndex = 3
let activeThumbIndex = 0

function getEliments(){
  return{
    heroImage : document.getElementById('heroImage'),
    panelTitel : document.getElementById('panel-title'),
    panelDesc : document.getElementById('panel-desc'),
    categoryBtns: document.querySelectorAll('.ctgry-btn'),
    thumbs: document.querySelectorAll('.thumb')

}}




// project section start

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
        // Remove animation class to reset it
        card.classList.remove("card-animate");
        // Trigger reflow to restart animation
        void card.offsetWidth;
        // Add animation class back
        card.classList.add("card-animate");
      } else {
        card.style.display = "none";
        card.classList.remove("card-animate");
      }
    });
  });
});



function renderProject() {
  for (let cards = 0; cards < STATE.data.projectCardDetails.length; cards++) {
    const element = STATE.data.projectCardDetails[cards];
    let mainContainer = document.getElementById("projectGridCont");

    mainContainer.innerHTML += 
        `
          <div class="pro-card card-animate" data-category="${element.dataCategory}" data-id="card${cards + 1}">
            <div class="pro-img-cont">
              <img 
                src="${element.mainImage}" 
                alt="${element.cardTittle}" 
                loading="lazy"
              >
              <div class="pro-overlay">
                <button class="project-card-view-btn" data-index="${cards + 1}" aria-label="Learn more about ${element.cardTittle}"><i class="fa-solid fa-eye"></i>View</button>
              </div>
            </div>
            <div class="pro-content">
              <div class="pro-cont-head">
                <h3>${element.cardTittle}</h3>
                <span class="card-category-badge">${element.cardCategory}</span>
              </div>
            </div>
          </div>
        `;
  }
}


let popsec = document.getElementById("projectPopSec");
let closebtn = document.getElementById("closePop");
let body = document.querySelector('body');

function attachProjectCardListeners() {
  document.querySelectorAll(".project-card-view-btn").forEach((btn) => {
    const idx = parseInt(btn.getAttribute("data-index"), 10);
    btn.addEventListener("click", () => openpop(idx));
  });
}


function openpop(index) {
  const detail = STATE.data.projectCardDetails[index - 1];
  if (!detail) return;

  popsec.innerHTML = `
              <div class="conta">
                <div class="uper-part">
                    <img src="${detail.mainImage}"
                        alt="${detail.cardTittle}">
                    <div class="close-btn">
                        <i id="closePop" class="fa-solid fa-xmark"></i>
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
  popsec.style.zIndex = "1000"

  const innerClose = popsec.querySelector("#closePop");
  if (innerClose) {
    innerClose.addEventListener("click", () => {
      popsec.style.opacity = "0";
      popsec.style.visibility = "hidden";
      body.style.overflow = "auto";
      popsec.style.zIndex = "0"
    });
  }

  popsec.addEventListener('click', e => {
    if (e.target === popsec) {
      popsec.style.opacity = "0";
      popsec.style.visibility = "hidden";
      body.style.overflow = "auto";
    }
  });

}

// project section end




// Gallery Section start

function renderGallery() {
  const grid = document.getElementById("galleryPhotos");

  for (let i = 0; i < STATE.data.galleryData.length; i++) {
    const item = STATE.data.galleryData[i];

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
}

// Gallery Section end






// ===== Contact Form Submit =====
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyqRwez_B7ODZJ7qxy9g9A6SWPuBqSt55rSKaABlTvARHrl-koIIDHuAnwpbLlOJiqb/exec";

document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();

  const btn = document.getElementById("cf-btn");
  const name = document.getElementById("cf-name").value.trim();
  const phone = document.getElementById("cf-phone").value.trim();
  const email = document.getElementById("cf-email").value.trim();
  const subject = document.getElementById("cf-subject").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !email || !subject || !message) {
    alert("⚠️ Please fill all fields!");
    return;
  }

  btn.textContent = "Sending...";
  btn.disabled = true;

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, email, subject, message })
    });

    btn.textContent = "✅ Message Sent!";
    btn.style.background = "#2e7d32";
    document.getElementById("contactForm").reset();

    setTimeout(() => {
      btn.textContent = "Send Message";
      btn.style.background = "";
      btn.disabled = false;
    }, 2000);

  } catch (err) {
    btn.textContent = "❌ Failed. Try Again";
    btn.style.background = "#c62828";
    btn.disabled = false;
  }
});




init()