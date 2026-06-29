"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ReactLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);
export default function Home() {
  const lenisRef = useRef();
  const teamSectionRef = useRef(null);
  const cardPlaceholderEntranceRef = useRef(null);
  const cardSlideInAnimationRef = useRef(null);

  useEffect(() => {
    function update(time) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  useGSAP(
    () => {
      const teamSection = teamSectionRef.current;
      const teamMembers = gsap.utils.toArray(".team-member");
      const teamMemberCards = gsap.utils.toArray(".team-member-card");

      function initTeamAnimations() {
        if (window.innerWidth < 1000) {
          if (cardPlaceholderEntranceRef.current)
            cardPlaceholderEntranceRef.current.kill();
          if (cardSlideInAnimationRef.current)
            cardSlideInAnimationRef.current.kill();

          teamMembers.forEach((member) => {
            gsap.set(member, { clearProps: "all" });
            const teamMemberInitial = member.querySelector(
              ".team-member-name-initial h1"
            );
            gsap.set(teamMemberInitial, { clearProps: "all" });
          });

          teamMemberCards.forEach((card) => {
            gsap.set(card, { clearProps: "all" });
          });

          return;
        }

        if (cardPlaceholderEntranceRef.current)
          cardPlaceholderEntranceRef.current.kill();
        if (cardSlideInAnimationRef.current)
          cardSlideInAnimationRef.current.kill();

        cardPlaceholderEntranceRef.current = ScrollTrigger.create({
          trigger: teamSection,
          start: "top bottom",
          end: "top top",
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            teamMembers.forEach((member, index) => {
              const entranceDelay = 0.15;
              const entranceDuration = 0.7;
              const entranceStart = index * entranceDelay;
              const entranceEnd = entranceStart + entranceDuration;

              if (progress >= entranceStart && progress <= entranceEnd) {
                const memberEntranceProgress =
                  (progress - entranceStart) / entranceDuration;

                const entranceY = 125 - memberEntranceProgress * 125;
                gsap.set(member, { y: `${entranceY}%` });

                const teamMemberInitial = member.querySelector(
                  ".team-member-name-initial h1"
                );
                const initialLetterScaleDelay = 0.4;
                const initialLetterScaleProgress = Math.max(
                  0,
                  (memberEntranceProgress - initialLetterScaleDelay) /
                    (1 - initialLetterScaleDelay)
                );
                gsap.set(teamMemberInitial, {
                  scale: initialLetterScaleProgress,
                });
              } else if (progress > entranceEnd) {
                gsap.set(member, { y: `0%` });
                const teamMemberInitial = member.querySelector(
                  ".team-member-name-initial h1"
                );
                gsap.set(teamMemberInitial, { scale: 1 });
              }
            });
          },
        });

        cardSlideInAnimationRef.current = ScrollTrigger.create({
          trigger: teamSection,
          start: "top top",
          end: `+=${window.innerHeight * 3}`,
          pin: true,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;

            teamMemberCards.forEach((card, index) => {
              const slideInStagger = 0.075;
              const xRotationDuration = 0.4;
              const xRotationStart = index * slideInStagger;
              const xRotationEnd = xRotationStart + xRotationDuration;

              if (progress >= xRotationStart && progress <= xRotationEnd) {
                const cardProgress =
                  (progress - xRotationStart) / xRotationDuration;

                const cardInitialX = 300 - index * 100;
                const cardTargetX = -50;
                const cardSlideInX =
                  cardInitialX + cardProgress * (cardTargetX - cardInitialX);

                const cardSlideInRotation = 20 - cardProgress * 20;

                gsap.set(card, {
                  x: `${cardSlideInX}%`,
                  rotation: cardSlideInRotation,
                });
              } else if (progress > xRotationEnd) {
                gsap.set(card, {
                  x: `-50%`,
                  rotation: 0,
                });
              }

              const cardScaleStagger = 0.12;
              const cardScaleStart = 0.4 + index * cardScaleStagger;
              const cardScaleEnd = 1;

              if (progress >= cardScaleStart && progress <= cardScaleEnd) {
                const scaleProgress =
                  (progress - cardScaleStart) / (cardScaleEnd - cardScaleStart);
                const scaleValue = 0.75 + scaleProgress * 0.25;

                gsap.set(card, {
                  scale: scaleValue,
                });
              } else if (progress > cardScaleEnd) {
                gsap.set(card, {
                  scale: 1,
                });
              }
            });
          },
        });
      }

      let resizeTimer;
      const handleResize = () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          initTeamAnimations();
          ScrollTrigger.refresh();
        }, 250);
      };

      window.addEventListener("resize", handleResize);

      initTeamAnimations();

      return () => {
        window.removeEventListener("resize", handleResize);
        if (cardPlaceholderEntranceRef.current)
          cardPlaceholderEntranceRef.current.kill();
        if (cardSlideInAnimationRef.current)
          cardSlideInAnimationRef.current.kill();
      };
    },
    { scope: teamSectionRef }
  );

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />

      <section className="hero">
        <h1>Faces Behind the Frame</h1>
      </section>

      <section className="team" ref={teamSectionRef}>
        <div className="team-member">
          <div className="team-member-name-initial">
            <h1>C</h1>
          </div>
          <div className="team-member-card">
            <div className="team-member-img">
              <img src="/team-member-1.jpg" alt="" />
            </div>
            <div className="team-member-info">
              <p>( Creative Director )</p>
              <h1>
                Caspian <span>Merlow</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="team-member">
          <div className="team-member-name-initial">
            <h1>E</h1>
          </div>
          <div className="team-member-card">
            <div className="team-member-img">
              <img src="/team-member-2.jpg" alt="" />
            </div>
            <div className="team-member-info">
              <p>( Executive Producer )</p>
              <h1>
                Evander <span>Coren</span>
              </h1>
            </div>
          </div>
        </div>

        <div className="team-member">
          <div className="team-member-name-initial">
            <h1>L</h1>
          </div>
          <div className="team-member-card">
            <div className="team-member-img">
              <img src="/team-member-3.jpg" alt="" />
            </div>
            <div className="team-member-info">
              <p>( Head of Production )</p>
              <h1>
                Leopold <span>Draven</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      <section className="outro">
        <h1>Where Vision Becomes Work</h1>
      </section>
    </>
  );
}
