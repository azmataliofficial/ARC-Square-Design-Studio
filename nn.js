
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveLink() {
    const scroll = window.scrollY;
    let current = '';
    sections.forEach(s => {
        const top = s.offsetTop, height = s.clientHeight;
        if (scroll >= top - 300 && scroll < top + height - 300) current = s.id;
    });
    if (scroll < 100) current = 'home';
    navLinks.forEach(l => l.classList.toggle('active', l.dataset.section === current));
}

window.addEventListener('scroll', updateActiveLink);
window.addEventListener('load', updateActiveLink);

navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});