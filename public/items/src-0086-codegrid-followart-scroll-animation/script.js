import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis();
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);

  const sections = document.querySelectorAll("section");

  sections.forEach((section, index) => {
    const container = section.querySelector(".container");

    gsap.to(container, {
      rotation: 0,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "top 20%",
        scrub: true,
      },
    });

    if (index === sections.length - 1) return;

    ScrollTrigger.create({
      trigger: section,
      start: "bottom bottom",
      end: "bottom top",
      pin: true,
      pinSpacing: false,
    });
  });
});
