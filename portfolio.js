
        // Set current year in footer
        document.getElementById('year').textContent = new Date().getFullYear();

        // Custom Cursor Logic
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

        // Particles.js Config
        particlesJS("particles-js", {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00DDEB" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: { enable: true, distance: 150, color: "#FF00FF", opacity: 0.4, width: 1 },
                move: { enable: true, speed: 2, direction: "none", random: false }
            },
            interactivity: {
                detect_on: "canvas",
                events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
                modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
            },
            retina_detect: true
        });

        // Theme Toggle Logic
        const toggleButton = document.querySelector('.theme-toggle');
        const body = document.body;

        toggleButton.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            
            // Adjust particle colors based on theme
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

        // Scroll Animation Logic
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

        // Tilt.js Initialization
        VanillaTilt.init(document.querySelectorAll(".project-card"), {
            max: 15,
            speed: 400,
            glare: true,
            "max-glare": 0.3
        });

        // Typewriter Effect
        const typewriterText = document.querySelector('.typewriter').textContent;
        document.querySelector('.typewriter').textContent = '';
        let i = 0;
        const speed = 50; // typing speed in ms
        
        function typeWriter() {
            if (i < typewriterText.length) {
                document.querySelector('.typewriter').textContent += typewriterText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        setTimeout(typeWriter, 1000); // Start after 1 second

        // Enhanced mobile menu with swipe gestures
const nav = document.createElement('div');
nav.className = 'mobile-nav';
nav.innerHTML = `
  <div class="mobile-menu">
    <a href="#about">About</a>
    <a href="#skills">Skills</a>
    <a href="#projects">Projects</a>
    <a href="#contact">Contact</a>
  </div>
  <div class="hamburger">
    <span></span>
    <span></span>
    <span></span>
  </div>
`;

// Add touch event listeners for swipe gestures
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
  touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  if (touchEndX < touchStartX - 50) {
    // Swipe left - close menu
    nav.classList.remove('active');
  }
  if (touchEndX > touchStartX + 50) {
    // Swipe right - open menu
    nav.classList.add('active');
  }
}
// Add 3D tilt effect to skill cards
VanillaTilt.init(document.querySelectorAll(".skill-card"), {
  max: 15,
  speed: 400,
  glare: true,
  "max-glare": 0.2,
  gyroscope: true
});

// Add skill level indicators
const skills = [
  { name: 'HTML5', level: 95 },
  { name: 'CSS3', level: 90 },
  { name: 'JavaScript', level: 85 },
  { name: 'React.js', level: 80 }
];

const skillsContainer = document.querySelector('.skills-grid');
skillsContainer.innerHTML = skills.map(skill => `
  <div class="skill-card">
    <div class="skill-name">${skill.name}</div>
    <div class="skill-bar">
      <div class="skill-level" style="width: ${skill.level}%"></div>
    </div>
    <div class="skill-percent">${skill.level}%</div>
  </div>
`).join('');

// Project filtering system
const projects = [
  { 
    title: "E-Commerce Store", 
    tags: ["javascript", "css"], 
    image: "commerceStore.jpeg",
    links: {
      live: "https://akstan001.github.io/premiumQosCloset/",
      code: "https://github.com/akStan001/premiumCloset.git"
    }
  }
  // Add other projects...
];

const filters = ['All', 'JavaScript', 'React', 'CSS'];
const filterContainer = document.createElement('div');
filterContainer.className = 'project-filters';

filters.forEach(filter => {
  const button = document.createElement('button');
  button.textContent = filter;
  button.addEventListener('click', () => filterProjects(filter));
  filterContainer.appendChild(button);
});

document.querySelector('#projects').prepend(filterContainer);

function filterProjects(tag) {
  const filtered = tag === 'All' 
    ? projects 
    : projects.filter(proj => proj.tags.includes(tag.toLowerCase()));
  
  renderProjects(filtered);
}
// Lazy loading for images
document.querySelectorAll('img').forEach(img => {
  img.loading = 'lazy';
});

// Intersection Observer for animations
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
    
