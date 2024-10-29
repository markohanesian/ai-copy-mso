import React from 'react';
import CopyGenerator from './components/CopyGenerator';
import Nav from './components/Nav';
// eslint-disable-next-line
import Hero from './components/Hero';
import './App.css'

const App = () => {
    return (
        <div id="app">
            <Nav />
            {/* <Hero /> */}
            <CopyGenerator />
        </div>
    );
};

export default App;
