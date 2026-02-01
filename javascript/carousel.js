export function initCarousel() {

  const track = document.querySelector(".feature-track");
  const viewport = document.querySelector(".feature-viewport");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");

  if (!track || !prev || !next || !viewport) return;

  let cards = Array.from(document.querySelectorAll(".feature-card"));

  let visible = getVisible();
  let index = visible;

  function getVisible() {
    if (window.innerWidth < 768) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  }

  function cardWidth() {
    if (window.innerWidth < 768) {
      return viewport.offsetWidth;
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

    cards = Array.from(track.querySelectorAll(".feature-card"));
    index = visible;

    requestAnimationFrame(() => move(true));
  }

  function move(noTransition = false) {
    track.style.transition =
      noTransition ? "none" : "transform 0.6s ease";

    track.style.transform =
      `translateX(-${index * cardWidth()}px)`;

    setActiveCard();
  }

  function setActiveCard() {
    cards.forEach(c => c.classList.remove("active"));
    const centerOffset = Math.floor(visible / 2);
    const activeIndex = index + centerOffset;

    if (cards[activeIndex]) {
      cards[activeIndex].classList.add("active");
    }
  }

  next.addEventListener("click", () => {
    index++;
    move();
  });
  prev.addEventListener("click", () => {
    index--;
    move();
  });

  // Loop
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
}