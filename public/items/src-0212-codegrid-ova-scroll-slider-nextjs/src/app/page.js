"use client";

import Slider from "@/components/Slider/Slider";
import { ReactLenis, useLenis } from "lenis/react";

export default function Home() {
  const lenis = useLenis((lenis) => {});

  return (
    <>
      <ReactLenis root />

      <nav>
        <div className="logo">
          <p>Codegrid / Experiment 501</p>
        </div>
        <div className="site-info">
          <p>[ Scroll Motion Slider ]</p>
        </div>
      </nav>

      <section className="intro">
        <h1>
          Scroll to explore the rhythm of still images that move quietly between
          story and sensation.
        </h1>
      </section>

      <Slider />

      <section className="outro">
        <h1>
          As the sequence slows the silence takes over, holding the last traces
          of motion in the air.
        </h1>
      </section>
    </>
  );
}
