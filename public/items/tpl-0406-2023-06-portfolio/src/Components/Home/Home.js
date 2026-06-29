import React from "react";
import "./Home.css";

import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import transition from "../../transition";

import Project1Img from "../../Images/project-1.png";
import Project2Img from "../../Images/project-2.png";
import Project3Img from "../../Images/project-3.png";
import Project4Img from "../../Images/project-4.png";
import Project5Img from "../../Images/project-5.png";

const Home = () => {
  return (
    <motion.div className="Home">
      <div className="bg"></div>
      <section className="hero">
        <div className="headers">
          <div className="header header-1">
            <h1>
              <motion.div
                initial={{
                  top: "7rem",
                  transition: {
                    duration: 1,
                    ease: [0.83, 0, 0.17, 1],
                    delay: -0.25,
                  },
                }}
                animate={{
                  top: 0,
                  transition: {
                    duration: 1.5,
                    ease: [0.83, 0, 0.17, 1],
                    delay: -0.25,
                  },
                }}
                className="h1"
              >
                joe sournair
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
            <h1>
              <motion.div
                className="h1"
                initial={{
                  top: "7rem",
                  transition: {
                    duration: 1,
                    ease: [0.83, 0, 0.17, 1],
                    delay: -0.1,
                  },
                }}
                animate={{
                  top: 0,
                  transition: {
                    duration: 1.5,
                    ease: [0.83, 0, 0.17, 1],
                    delay: -0.1,
                  },
                }}
              >
                &nbsp;visual
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
            <h1>
              <motion.div
                className="h1"
                initial={{
                  top: "7rem",
                  transition: {
                    duration: 1,
                    ease: [0.83, 0, 0.17, 1],
                    delay: 0.05,
                  },
                }}
                animate={{
                  top: 0,
                  transition: {
                    duration: 1.5,
                    ease: [0.83, 0, 0.17, 1],
                    delay: 0.05,
                  },
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;dev.
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
          </div>
          <div className="header header-2">
            <h1>
              <motion.div
                className="h1"
                initial={{
                  top: "7rem",
                  transition: {
                    duration: 1,
                    ease: [0.83, 0, 0.17, 1],
                    delay: -0.25,
                  },
                }}
                animate={{
                  top: 0,
                  transition: {
                    duration: 1.5,
                    ease: [0.83, 0, 0.17, 1],
                    delay: -0.25,
                  },
                }}
              >
                portfolio
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
            <h1>
              <motion.div
                className="h1"
                initial={{
                  top: "7rem",
                  transition: {
                    duration: 1,
                    ease: [0.83, 0, 0.17, 1],
                    delay: -0.1,
                  },
                }}
                animate={{
                  top: 0,
                  transition: {
                    duration: 1.5,
                    ease: [0.83, 0, 0.17, 1],
                    delay: -0.1,
                  },
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2022&
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
            <h1>
              <motion.div
                className="h1"
                initial={{
                  top: "7rem",
                  transition: {
                    duration: 1,
                    ease: [0.83, 0, 0.17, 1],
                    delay: 0.05,
                  },
                }}
                animate={{
                  top: 0,
                  transition: {
                    duration: 1.5,
                    ease: [0.83, 0, 0.17, 1],
                    delay: 0.05,
                  },
                }}
              >
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2023.
              </motion.div>
              <div className="h1-revealer"></div>
            </h1>
          </div>
        </div>
        <div className="footer">
          <motion.div
            className="divider"
            initial={{
              width: 0,
              transition: {
                duration: 1,
                ease: [0.83, 0, 0.17, 1],
              },
            }}
            animate={{
              width: "100%",
              transition: {
                duration: 1.5,
                ease: [0.83, 0, 0.17, 1],
              },
            }}
          ></motion.div>
          <motion.div
            className="footer-content"
            initial={{
              y: 200,
              opacity: 0,
              transition: { duration: 1, ease: [0.83, 0, 0.17, 1], delay: 2 },
            }}
            animate={{
              y: 0,
              opacity: 1,
              transition: {
                duration: 2,
                ease: [0.83, 0, 0.17, 1],
              },
            }}
          >
            <div className="footer-col">
              <div className="arrow">
                <p>&darr;</p>
              </div>
              <div className="arrow">
                <p>&darr;</p>
              </div>
            </div>
            <div className="footer-col">
              <p>
                currently creating at <br /> impressions studio
              </p>
            </div>
            <div className="footer-col">
              <p>
                previously visual dev at <br /> chromatic waves
              </p>
            </div>
            <div className="footer-col">
              <p>
                prev intern <br /> at mario
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="projects-nav">
        <div className="projects-nav-container">
          <div className="project-item">
            <Link to="/project">
              <div className="project-link">
                <div className="project-l">
                  <div className="project-link-img">
                    <img src={Project1Img} alt="" />
                  </div>
                  <div className="project-name">
                    <h2>Inked</h2>
                  </div>
                </div>
                <div className="project-date">
                  <p>experience</p>
                  <p>/2022</p>
                </div>
                <div className="project-dir">
                  <p>&#8599;</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="project-item">
            <Link to="/project">
              <div className="project-link">
                <div className="project-l">
                  <div className="project-link-img">
                    <img src={Project2Img} alt="" />
                  </div>
                  <div className="project-name">
                    <h2>Chromatic</h2>
                  </div>
                </div>
                <div className="project-date">
                  <p>development</p>
                  <p>/2023</p>
                </div>
                <div className="project-dir">
                  <p>&#8599;</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="project-item">
            <Link to="/project">
              <div className="project-link">
                <div className="project-l">
                  <div className="project-link-img">
                    <img src={Project3Img} alt="" />
                  </div>
                  <div className="project-name">
                    <h2>Impressions</h2>
                  </div>
                </div>
                <div className="project-date">
                  <p>portfolio</p>
                  <p>/2019</p>
                </div>
                <div className="project-dir">
                  <p>&#8599;</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="project-item">
            <Link to="/project">
              <div className="project-link">
                <div className="project-l">
                  <div className="project-link-img">
                    <img src={Project4Img} alt="" />
                  </div>
                  <div className="project-name">
                    <h2>Stellar</h2>
                  </div>
                </div>
                <div className="project-date">
                  <p>experience</p>
                  <p>/2021</p>
                </div>
                <div className="project-dir">
                  <p>&#8599;</p>
                </div>
              </div>
            </Link>
          </div>

          <div className="project-item">
            <Link to="/project">
              <div className="project-link">
                <div className="project-l">
                  <div className="project-link-img">
                    <img src={Project5Img} alt="" />
                  </div>
                  <div className="project-name">
                    <h2>Byte</h2>
                  </div>
                </div>
                <div className="project-date">
                  <p>development</p>
                  <p>/2018</p>
                </div>
                <div className="project-dir">
                  <p>&#8599;</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      <section className="about">
        <div className="about-container">
          <div className="about-col">
            <p>(about this guy)</p>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corporis
              adipisci impedit harum, quia tenetur nulla minima illum
              consequuntur amet incidunt corrupti asperiores dicta fuga
              voluptatum ullam hic delectus ipsa autem quidem voluptate. Ipsum
              ratione nostrum facilis error, facere odit enim? Lorem ipsum dolor
              sit amet consectetur adipisicing elit. Consectetur, ab. Lorem
              ipsum dolor sit amet consectetur adipisicing elit. A, fugit?
            </p>
          </div>
          <div className="about-col">
            <div className="socials">
              <a href="#">email &#8599;</a>
              <a href="#">twitter &#8599;</a>
              <a href="#">linkedin &#8599;</a>
            </div>
          </div>
        </div>
      </section>

      <div className="footer">
        <div className="divider"></div>
        <div className="footer-content">
          <div className="footer-col">
            <div className="arrow">
              <p>&#8593;</p>
            </div>
            <div className="arrow">
              <p>&#8593;</p>
            </div>
          </div>
          <div className="footer-col">
            <p>
              &copyright by <br /> not codegrid
            </p>
          </div>
          <div className="footer-col">
            <p>
              no rights for <br /> creative dev
            </p>
          </div>
          <div className="footer-col">
            <p>
              no rights for <br /> any design
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default transition(Home);
