document.addEventListener('DOMContentLoaded', () => {

    // THEME SWITCH
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

    // SPOTLIGHT
    window.addEventListener('mousemove', e => {
        document.documentElement.style.setProperty('--x', e.clientX + 'px');
        document.documentElement.style.setProperty('--y', e.clientY + 'px');
    });

    // GSAP REVEAL
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.reveal').forEach(el => {
        gsap.from(el, {
            y: 40,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%"
            }
        });
    });

});
