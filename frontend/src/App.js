import React from "react";
import CopyGenerator from "./components/CopyGenerator";
import Nav from "./components/Nav";
import "./App.css";
import HomeHero from "./components/HomeHero";

const App = () => {
  return (
    <>
      <Nav />
      <div id="main">
        <HomeHero />
        <CopyGenerator />
      </div>
    </>
  );
};

export default App;
