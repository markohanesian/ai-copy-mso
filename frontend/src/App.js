import React from 'react';
import CopyGenerator from './components/CopyGenerator';
import Nav from './components/Nav';
import './App.css'

const App = () => {
    return (
        <div id="app">
            <Nav />
            <CopyGenerator />
        </div>
    );
};

export default App;
