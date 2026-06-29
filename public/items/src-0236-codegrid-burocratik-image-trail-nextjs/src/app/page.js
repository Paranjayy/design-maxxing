"use client";

import { useEffect } from "react";
import ImageTrail from "@/components/ImageTrail";

import ReactLenis from "@studio-freight/react-lenis";

export default function Home() {
  const images = Array.from(
    { length: 35 },
    (_, i) => `/assets/img${i + 1}.jpeg`
  );

  return (
    <ReactLenis root>
      <main>
        <section className="intro">
          <h1>Dynamic Cursor Trail Animation</h1>
        </section>

        <section className="trail-container">
          <p>( Move your cursor around and see the magic unfold )</p>
          <ImageTrail images={images} />
        </section>

        <section className="outro">
          <h1>Wrapping Up</h1>
        </section>
      </main>
    </ReactLenis>
  );
}
