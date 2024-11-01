import React from 'react';
import CopyGenerator from './components/CopyGenerator';
import Nav from './components/Nav';
import './App.css'
import HomeHero from './components/HomeHero';

const App = () => {
    return (
        <div id="app">
            <Nav />
            <HomeHero />
            <CopyGenerator />
        </div>
    );
};

export default App;
