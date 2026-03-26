// Navbaar Items script
document.addEventListener("DOMContentLoaded", function () {
  let navContaners = document.querySelectorAll(".slide-sec")
  let navItems = document.querySelectorAll(".nav-link")

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
  let navItems = document.querySelectorAll(".nav-link")


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

window.addEventListener("load", initializeMenu())

window.addEventListener("resize", () => {
  if (window.innerWidth <= 768) {
    navLinkCont.style.maxHeight = "0px"
    navLinkCont.style.padding = "0px"
    isOpen = false
  } else {
    navLinkCont.style.maxHeight = "none"
    isOpen = false
  }
});
// navbaar end


// Hero Slider start

const slidesData = [
  {
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Modern Interior Design",
    description: "Designed with modern aesthetics in mind",
    buttonText: "Get Started",
    buttonLink: "#contact"
  },
  {
    image: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Stunning Exterior Design",
    description: "Architecture that inspires",
    buttonText: "Explore Images",
    buttonLink: "#gallery"
  },
  {
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1920",
    title: "Modern Living Spaces",
    description: "Where architecture meets comfort",
    buttonText: "View Projects",
    buttonLink: "#projects"
  }
];


let current = 0
let timer;


let wrapper = document.getElementById('slideswrapper')
let prevbtn = document.getElementById('prevSlide')
let nextbtn = document.getElementById('nextSlide')
let dotsContainer = document.getElementById('dotsContainer');

slidesData.forEach((data, index) => {
  const slide = document.createElement('div')
  slide.className = 'slide'
  slide.style.backgroundImage = `url('${data.image}')`
  slide.innerHTML = ` <div class="slide-content">
                            <h1>${data.title}</h1>
                            <p>${data.description}</p>
                            <button style="--clr: #7808d0" onclick="scrollToSection('${data.buttonLink}')"
                                style="text-decoration: none;"> 
                                <span class="button__icon-wrapper">
                                    <svg viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg"
                                        class="button__icon-svg" width="10">
                                        <path
                                            d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"
                                            fill="currentColor"></path>
                                    </svg>

                                    <svg viewBox="0 0 14 15" fill="none" width="10" xmlns="http://www.w3.org/2000/svg"
                                        class="button__icon-svg button__icon-svg--copy">
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

// testimonial start
const testimonial = [{
  clientName: "Rakhi Singh",
  location: "DM Road Bulandshahar",
  instagram: "https://www.instagram.com/uv_glaam/",
  rating: 5,
  text: "I am very happy with the work of ARC Square. They have done a great job in designing my beauty parlour. The team was very professional and they completed the work within the given time frame. I would definitely recommend them to others.",
  projectType: "Beauty Parlour Design",
  avatar: "RS"
},
{
  clientName: "Arif Saifi",
  location: "Bulandshahr City",
  instagram: "https://www.instagram.com/arcsquaredesignstudio/",
  rating: 4.5,
  text: "We engaged ARC Square for our office interior design and the results exceeded our expectations. Their 3D visualization helped us visualize the space before execution. The team was responsive, creative, and delivered the project within the stipulated timeline. Great experience!",
  projectType: "Commercial Interior",
  avatar: "AS"
},
{
  clientName: "Azmat Ali",
  location: "Delhi NCR",
  instagram: "https://www.instagram.com/azmataliofficial/",
  rating: 5,
  text: "Professional approach combined with creative excellence. ARC Square handled our villa project with utmost care. The structural planning was flawless and they incorporated modern aesthetics while maintaining functionality. Their attention to client requirements is commendable.",
  projectType: "Villa Design",
  avatar: "AA"
}
];

let currentTestimonialIndex = 0;

function renderTestimonials() {
  const grid = document.querySelector('.testiminial-grid');
  if (!grid) return;

  grid.innerHTML = '';

  for (let i = 0; i < 2; i++) {
    const itemIndex = (currentTestimonialIndex + i) % testimonial.length;
    const item = testimonial[itemIndex];

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
      <div class="testimonial-card slide-in-card" style="animation-delay: ${delay}s;">
        <div class="card-header">
          <div class="client-avatar">${item.avatar}</div>
          <div class="client-info">
            <h3>${item.clientName}</h3>
            <p class="client-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</p>
          </div>
        </div>
        <div class="rating">${stars} <span>${item.rating}</span></div>
        <div class="testimonial-content">
          <div class="testimonial-text">${item.text}</div>
          <div class="project-meta">
            <span class="project-tag"><i class="fas fa-tag"></i> ${item.projectType}</span>
            <a href="${item.instagram}" target="_blank" rel="noopener noreferrer" class="instagram-tag">
              <i class="fab fa-instagram"></i></a>
          </div>
        </div>
      </div>
    `;
    grid.innerHTML += card;
  }
}

function testimonials() {
  const grid = document.querySelector('.testiminial-grid');
  if (!grid) return;

  renderTestimonials();

  setInterval(() => {
    currentTestimonialIndex = (currentTestimonialIndex + 2) % testimonial.length;
    renderTestimonials();
  }, 8000);
}

window.addEventListener('DOMContentLoaded', testimonials);

// testimonial end



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




// service popup 

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
  popsec.style.zIndex = "1000"

  const innerClose = popsec.querySelector("#close-pop");
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

// Services section end


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



// Gallery Section start
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

// Gallery Section end























// faq
document.querySelectorAll('.cat-tab').forEach(function (tab) {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.cat-tab').forEach(function (t) {
      t.classList.remove('active');
    });

    document.querySelectorAll('.faq-panel').forEach(function (p) {
      p.classList.remove('active');
    });

    this.classList.add('active');

    let catId = this.getAttribute('data-cat');
    document.querySelector('.faq-panel[data-panel="' + catId + '"]').classList.add('active');
  });
});
document.querySelectorAll('.faq-question').forEach(function (question) {
  question.addEventListener('click', function () {
    let currentItem = this.closest('.faq-item');
    let panel = currentItem.closest('.faq-panel');
    panel.querySelectorAll('.faq-item').forEach(function (item) {
      if (item !== currentItem) {
        item.classList.remove('open');
      }
    });
    currentItem.classList.toggle('open');
  });
});