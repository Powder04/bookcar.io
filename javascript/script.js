document.addEventListener('DOMContentLoaded', () => {

    const toggle = document.getElementById('themeToggle');
    const circle = document.getElementById('themeCircle');
    const html = document.documentElement;

    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);

    toggle.addEventListener('click', () => {
        setTheme(html.dataset.theme === 'dark' ? 'light' : 'dark');
    });

    function setTheme(theme) {
        html.dataset.theme = theme;
        localStorage.setItem('theme', theme);
        toggle.classList.toggle('light-active', theme === 'light');
        circle.innerHTML = theme === 'light' ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
    }

    window.addEventListener('mousemove', e => {
        document.documentElement.style.setProperty('--x', e.clientX + 'px');
        document.documentElement.style.setProperty('--y', e.clientY + 'px');
    });

    gsap.registerPlugin(ScrollTrigger);

    // reveal từ trái
    gsap.utils.toArray('.reveal-x-left').forEach(el => {
        gsap.from(el, {
            x: -120,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            }
        });
    });

    // reveal từ phải
    gsap.utils.toArray('.reveal-x-right').forEach(el => {
        gsap.from(el, {
            x: 120,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            }
        });
    });

    gsap.to(".hero-image img", {
        scale: 1.08,
        scrollTrigger: {
            trigger: ".hero-split",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });
});

// Show form booking
function showForm(id) {
  document.getElementById(id).classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeForm() {
  document.getElementById('booking').classList.remove('active');
  document.body.style.overflow = '';
}

// Carousel
const track = document.querySelector(".feature-track");
let cards = Array.from(document.querySelectorAll(".feature-card"));
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let visible = getVisible();
let index = visible;

function getVisible() {
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  return 3;
}

function cardWidth() {
  if (window.innerWidth < 768) {
    return document.querySelector(".feature-viewport").offsetWidth;
  }
  return cards[0].getBoundingClientRect().width + 24;
}

function setupClones() {
  track.innerHTML = "";

  const originals = cards.slice(0);
  const first = originals.slice(0, visible).map(c => c.cloneNode(true));
  const last = originals.slice(-visible).map(c => c.cloneNode(true));

  last.forEach(c => track.appendChild(c));
  originals.forEach(c => track.appendChild(c));
  first.forEach(c => track.appendChild(c));

  cards = Array.from(document.querySelectorAll(".feature-card"));
  index = visible;

  requestAnimationFrame(() => move(true));
}

function move(noTransition = false) {
  track.style.transition = noTransition ? "none" : "transform 0.6s ease";
  track.style.transform = `translateX(-${index * cardWidth()}px)`;
}

next.onclick = () => {
  index++;
  move();
};

prev.onclick = () => {
  index--;
  move();
};

track.addEventListener("transitionend", () => {
  if (index >= cards.length - visible) {
    index = visible;
    move(true);
  }
  if (index <= 0) {
    index = cards.length - visible;
    move(true);
  }
});

window.addEventListener("resize", () => {
  visible = getVisible();
  setupClones();
});

setupClones();
