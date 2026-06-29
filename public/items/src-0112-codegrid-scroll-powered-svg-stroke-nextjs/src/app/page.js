"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const pathRef = useRef(null);

  useGSAP(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();

    path.style.strokeDasharray = pathLength;
    path.style.strokeDashoffset = pathLength;

    gsap.to(path, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".spotlight",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      },
    });
  }, []);

  return (
    <>
      <ReactLenis root />

      <section className="hero">
        <h1>Designed to keep information clear and connected</h1>
      </section>

      <section className="spotlight">
        <div className="row">
          <div className="img">
            <img src="/img_1.svg" alt="" />
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <h2>A cleaner way to handle incoming updates</h2>
              <p>
                Instead of showing every message or notification instantly, the
                app groups related items and presents them in an organized
                panel. It keeps your workspace calm, even when activity spikes.
              </p>
            </div>
          </div>
          <div className="col">
            <div className="img">
              <img src="/img_2.svg" alt="" />
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="img">
              <img src="/img_3.svg" alt="" />
            </div>
          </div>
          <div className="col">
            <div className="card">
              <h2>Built for increasing information demands</h2>
              <p>
                Whether it is files, notes, or incoming messages, the app sorts
                and prioritizes items automatically. It prevents clutter and
                helps maintain clarity during busy periods.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="img">
            <img src="/img_4.svg" alt="" />
          </div>
        </div>

        <div className="svg-path">
          <svg
            viewBox="0 0 1378 2760"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMin meet"
          >
            <path
              ref={pathRef}
              id="stroke-path"
              d="M639.668 100C639.668 100 105.669 100 199.669 601.503C293.669 1103.01 1277.17 691.502 1277.17 1399.5C1277.17 2107.5 -155.332 1968 140.168 1438.5C435.669 909.002 1442.66 2093.5 713.168 2659.5"
              stroke="#FF5F0A"
              strokeWidth="200"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </section>

      <section className="outro">
        <h1>Clearer organization ready for whatever comes next</h1>
      </section>
    </>
  );
}
