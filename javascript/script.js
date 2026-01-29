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
        circle.textContent = theme === 'light' ? '☀️' : '🌙';
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
