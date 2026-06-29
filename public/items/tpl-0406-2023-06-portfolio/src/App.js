import "./App.css";

import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Home from "./Components/Home/Home";
import Project from "./Components/Project/Project";

function App() {
  const location = useLocation();

  const isActivePage = (path) => {
    return location.pathname === path;
  };

  // setting the background color based on the active page
  const getBackgroundColor = () => {
    if (isActivePage("/")) {
      return "#191c1a";
    } else if (isActivePage("/project")) {
      return "#b0b0b0";
    }
    return "white"; // default background color
  };

  // apply the background color to the HTML and body elements
  document.documentElement.style.backgroundColor = getBackgroundColor();
  document.body.style.backgroundColor = getBackgroundColor();

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<Home />} />
          <Route path="/project" element={<Project />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
