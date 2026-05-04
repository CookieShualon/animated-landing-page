import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

export const defaultEase = "power3.out";

export function fadeIn(targets, options = {}) {
  if (prefersReducedMotion) {
    gsap.set(targets, { clearProps: "all", opacity: 1 });
    return null;
  }

  return gsap.from(targets, {
    autoAlpha: 0,
    y: 28,
    duration: 0.9,
    ease: defaultEase,
    stagger: 0.08,
    ...options
  });
}

export function fadeDown(targets, options = {}) {
  return fadeIn(targets, {
    y: -18,
    duration: 0.7,
    ...options
  });
}

export function scaleIn(targets, options = {}) {
  if (prefersReducedMotion) {
    gsap.set(targets, { clearProps: "all", opacity: 1, scale: 1 });
    return null;
  }

  return gsap.from(targets, {
    autoAlpha: 0,
    scale: 0.92,
    duration: 1,
    ease: defaultEase,
    ...options
  });
}

export function revealOnScroll(targets, options = {}) {
  if (prefersReducedMotion) {
    gsap.set(targets, { clearProps: "all", opacity: 1 });
    return [];
  }

  return gsap.utils.toArray(targets).map((target) =>
    gsap.from(target, {
      autoAlpha: 0,
      y: 48,
      duration: 0.85,
      ease: defaultEase,
      scrollTrigger: {
        trigger: target,
        start: "top 82%",
        once: true
      },
      ...options
    })
  );
}

export function staggerOnScroll(container, children, options = {}) {
  if (prefersReducedMotion) {
    gsap.set(children, { clearProps: "all", opacity: 1 });
    return null;
  }

  return gsap.from(children, {
    autoAlpha: 0,
    y: 36,
    duration: 0.8,
    ease: defaultEase,
    stagger: 0.12,
    scrollTrigger: {
      trigger: container,
      start: "top 78%",
      once: true
    },
    ...options
  });
}

export function animateCounters(targets) {
  if (prefersReducedMotion) {
    gsap.utils.toArray(targets).forEach((target) => {
      target.textContent = target.dataset.counter;
    });
    return [];
  }

  return gsap.utils.toArray(targets).map((target) => {
    const value = Number(target.dataset.counter || 0);
    const counter = { value: 0 };

    return gsap.to(counter, {
      value,
      duration: 1.6,
      ease: "power2.out",
      scrollTrigger: {
        trigger: target,
        start: "top 86%",
        once: true
      },
      onUpdate: () => {
        target.textContent = Math.round(counter.value).toString();
      }
    });
  });
}

export function cinematicScroll(section = "[data-cinematic]") {
  const target = document.querySelector(section);

  if (!target) return null;

  if (prefersReducedMotion) {
    gsap.set(target.querySelectorAll(".scene-frame, .scene-product"), {
      clearProps: "all",
      opacity: 1
    });
    return null;
  }

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: target,
      start: "top top",
      end: "+=260%",
      scrub: 1,
      pin: ".cinematic-stage",
      anticipatePin: 1
    }
  });

  timeline
    .from(".cinematic-copy", { autoAlpha: 0, y: 80, duration: 0.8, ease: defaultEase })
    .from(".scene-sun", { scale: 0.35, autoAlpha: 0, duration: 0.8, ease: defaultEase }, 0)
    .from(".scene-product", { y: 120, rotateX: 18, scale: 0.78, autoAlpha: 0, duration: 1 }, 0.15)
    .from(".frame-one", { xPercent: -120, rotate: -8, autoAlpha: 0, duration: 0.75 }, 0.35)
    .to(".scene-track-back", { xPercent: -18, duration: 1.4 }, 0)
    .to(".scene-track-front", { xPercent: 22, duration: 1.4 }, 0)
    .to(".frame-one", { y: -90, scale: 0.86, autoAlpha: 0.38, duration: 0.8 }, 1.0)
    .from(".frame-two", { xPercent: 120, rotate: 8, autoAlpha: 0, duration: 0.75 }, 1.05)
    .to(".scene-product", { rotateY: -12, z: 80, duration: 0.9 }, 1.05)
    .to(".product-screen i:nth-child(2)", { scaleX: 0.48, duration: 0.7 }, 1.1)
    .to(".frame-two", { y: -90, scale: 0.86, autoAlpha: 0.38, duration: 0.8 }, 1.8)
    .from(".frame-three", { yPercent: 120, scale: 0.84, autoAlpha: 0, duration: 0.75 }, 1.85)
    .to(".scene-sun", { y: -80, scale: 1.2, duration: 0.9 }, 1.85)
    .to(".scene-product", { rotateY: 0, scale: 1.08, duration: 0.9 }, 1.85)
    .to(".scene-glow", { scale: 1.35, autoAlpha: 0.95, duration: 0.9 }, 1.85);

  return timeline;
}

export function loopVisualAccents() {
  if (prefersReducedMotion) return null;

  return gsap
    .timeline({ repeat: -1, yoyo: true })
    .to(".orbit-one", { rotate: 18, scale: 1.05, duration: 4, ease: "sine.inOut" })
    .to(".orbit-two", { rotate: -16, scale: 0.96, duration: 4, ease: "sine.inOut" }, 0)
    .to(".bars span", { scaleY: 0.55, stagger: 0.1, duration: 1.2, ease: "sine.inOut" }, 0);
}
