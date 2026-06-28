"use client";

import { useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(CustomEase, SplitText, useGSAP);
CustomEase.create("hop", "0.85, 0, 0.15, 1");

export default function Home() {
  const counterRef = useRef(null);
  const heroHeaderRef = useRef(null);
  const overlayTextRef = useRef(null);
  const heroImagesRef = useRef(null);
  const imagesRef = useRef([]);
  const heroOverlayRef = useRef(null);
  const counter = useRef({ value: 0 });

  useGSAP(() => {
    const split = new SplitText(heroHeaderRef.current, {
      type: "words",
      mask: "words",
      wordsClass: "word",
    });

    const counterTl = gsap.timeline({ delay: 0.5 });
    const overlayTextTl = gsap.timeline({ delay: 0.75 });
    const revealTl = gsap.timeline({ delay: 0.5 });

    counterTl.to(counter.current, {
      value: 100,
      duration: 5,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.current.value);
        }
      },
    });

    overlayTextTl
      .to(overlayTextRef.current, {
        y: "0",
        duration: 0.75,
        ease: "hop",
      })
      .to(overlayTextRef.current, {
        y: "-2rem",
        duration: 0.75,
        ease: "hop",
        delay: 0.75,
      })
      .to(overlayTextRef.current, {
        y: "-4rem",
        duration: 0.75,
        ease: "hop",
        delay: 0.75,
      })
      .to(overlayTextRef.current, {
        y: "-6rem",
        duration: 0.75,
        ease: "hop",
        delay: 1,
      });

    revealTl
      .to(imagesRef.current, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: "hop",
      })
      .to(heroImagesRef.current, {
        gap: "0.75vw",
        duration: 1,
        delay: 0.5,
        ease: "hop",
      })
      .to(
        imagesRef.current,
        {
          scale: 1,
          duration: 1,
          ease: "hop",
        },
        "<"
      )
      .to(
        imagesRef.current.filter((_, i) => i !== 2),
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          stagger: 0.1,
          ease: "hop",
        }
      )
      .to(imagesRef.current[2], {
        scale: 2,
        duration: 1,
        ease: "hop",
      })
      .to(heroOverlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "hop",
      })
      .to(
        ".hero-header h1 .word",
        {
          y: "0",
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5"
      );
  }, []);

  return (
    <>
      <nav>
        <div className="nav-logo">
          <a href="#">Elara Vandenberg</a>
        </div>
        <div className="nav-items">
          <a href="#">Runway</a>
          <a href="#">Lookbook</a>
          <a href="#">Campaigns</a>
          <a href="#">Biography</a>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-overlay" ref={heroOverlayRef}>
          <div className="counter">
            <h1 ref={counterRef}>0</h1>
          </div>

          <div className="overlay-text-container">
            <div className="overlay-text" ref={overlayTextRef}>
              <p>Structure</p>
              <p>Designed Identity</p>
              <p>Welcome</p>
            </div>
          </div>
        </div>

        <div className="hero-images" ref={heroImagesRef}>
          <div className="img" ref={(el) => (imagesRef.current[0] = el)}>
            <img src="/img_1.jpg" alt="" />
          </div>
          <div className="img" ref={(el) => (imagesRef.current[1] = el)}>
            <img src="/img_2.jpg" alt="" />
          </div>
          <div
            className="img hero-img"
            ref={(el) => (imagesRef.current[2] = el)}
          >
            <img src="/img_3.jpg" alt="" />
          </div>
          <div className="img" ref={(el) => (imagesRef.current[3] = el)}>
            <img src="/img_4.jpg" alt="" />
          </div>
          <div className="img" ref={(el) => (imagesRef.current[4] = el)}>
            <img src="/img_5.jpg" alt="" />
          </div>
        </div>

        <div className="hero-header">
          <h1 ref={heroHeaderRef}>Elara Vandenberg</h1>
        </div>
      </section>
    </>
  );
}
