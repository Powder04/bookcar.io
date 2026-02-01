export function initTheme() {

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
    circle.innerHTML =
      theme === 'light'
        ? '<i class="fa-solid fa-sun"></i>'
        : '<i class="fa-solid fa-moon"></i>';
  }
}