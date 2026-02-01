export function initAnimation() {

  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray('.reveal-x-left').forEach(el => {
    gsap.from(el, {
      x: -120,
      opacity: 0,
      duration: 1.1,
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

}