// portfolio.js

// Set year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';

    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
});

document.querySelectorAll('a, button, .project-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#FF00FF';
        cursorFollower.style.transform = 'scale(2)';
        cursorFollower.style.background = '#00DDEB';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#00DDEB';
        cursorFollower.style.transform = 'scale(1)';
        cursorFollower.style.background = '#FF00FF';
    });
});

// Particle JS Background
particlesJS("particles-js", {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: "#00DDEB" },
        shape: { type: "circle" },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: "#FF00FF", opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2 }
    },
    interactivity: {
        events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
        modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Theme Toggle
const toggleButton = document.querySelector('.theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-theme');
    const particles = window.pJSDom[0].pJS.particles;
    if (body.classList.contains('dark-theme')) {
        particles.color.value = '#E0E0E0';
        particles.line_linked.color = '#FF6F61';
    } else {
        particles.color.value = '#00DDEB';
        particles.line_linked.color = '#FF00FF';
    }
    particles.color_rgb = null;
    particles.line_linked_rgb = null;
});

// Scroll Animation
const sections = document.querySelectorAll('section');
function checkScroll() {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.75;
        if (sectionTop < triggerPoint) {
            section.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', checkScroll);
checkScroll();

// VanillaTilt Init
VanillaTilt.init(document.querySelectorAll(".project-card, .skill-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3
});

// Typewriter Effect
const typewriterText = document.querySelector('.typewriter').textContent;
document.querySelector('.typewriter').textContent = '';
let i = 0;
const speed = 50;
function typeWriter() {
    if (i < typewriterText.length) {
        document.querySelector('.typewriter').textContent += typewriterText.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
setTimeout(typeWriter, 1000);

// Lazy Loading Images
document.querySelectorAll('img').forEach(img => {
    img.loading = 'lazy';
});

// Animate on View
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section, .project-card').forEach(el => {
    observer.observe(el);
});
