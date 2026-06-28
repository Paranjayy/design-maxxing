"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const lenisRef = useRef();
  const containerRef = useRef(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    lenisRef.current?.lenis?.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => gsap.ticker.remove(update);
  }, []);

  useGSAP(
    () => {
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
    },
    { scope: containerRef },
  );

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      <main ref={containerRef}>
        <section className="one">
          <div className="container">
            <div className="col">
              <h1>Entry Point</h1>
            </div>
            <div className="col">
              <p>
                This space introduces an initial idea without defining its
                outcome. Forms exist in a state of balance, shaped by intention
                rather than urgency. Nothing here demands resolution yet,
                allowing interpretation, contrast, and continuity to emerge
                naturally over time.
              </p>
            </div>
          </div>
        </section>

        <section className="two">
          <div className="container">
            <div className="col">
              <div className="img">
                <img src="/img2.jpg" alt="" />
              </div>
            </div>
            <div className="col">
              <h1>Gesture</h1>
              <p>
                Form and expression intersect without explanation. The subject
                exists between motion and stillness, marked by attitude rather
                than intent. What matters here is presence, silhouette, and the
                subtle tension created through contrast and placement.
              </p>
            </div>
          </div>
        </section>

        <section className="three">
          <div className="container">
            <div className="col">
              <h1>Variation</h1>
              <p>
                This section explores difference through placement and
                proportion. Repetition is avoided in favor of subtle change,
                where form, spacing, and color work together to maintain
                cohesion without uniformity.
              </p>
            </div>
            <div className="col">
              <div className="img">
                <img src="/img1.jpg" alt="" />
              </div>
            </div>
          </div>
        </section>

        <section className="four">
          <div className="container">
            <div className="img">
              <img src="/img3.jpg" alt="" />
            </div>
            <h1>The Stance</h1>
            <p>
              A clearer position begins to take shape. Elements feel grounded,
              deliberate, and visually assured. Rather than drifting, the
              composition asserts itself through proportion, contrast, and a
              controlled sense of weight.
            </p>
            <p>
              The layout favors stability over motion, offering a moment of
              visual certainty. Everything appears placed with purpose, allowing
              the section to feel complete without closing off interpretation.
            </p>
          </div>
        </section>

        <section className="five">
          <div className="container">
            <div className="col">
              <h1>Stillness</h1>
            </div>
            <div className="col">
              <p>
                This space holds without interruption. Nothing shifts
                unnecessarily, allowing form and color to remain uninterrupted.
                The emphasis rests on calm presence, where simplicity and
                restraint shape the experience without demanding attention.
              </p>
            </div>
          </div>
        </section>

        <section className="six">
          <div className="container">
            <div className="col">
              <h1>Release</h1>
            </div>
            <div className="col">
              <p>
                The composition loosens its grip and allows space to dominate.
                Elements soften, contrast fades, and structure becomes
                secondary. What remains is a sense of openness, where the
                experience settles without urgency or demand.
              </p>
            </div>
          </div>
        </section>

        <footer>
          <h1>Footer</h1>
        </footer>
      </main>
    </>
  );
}
