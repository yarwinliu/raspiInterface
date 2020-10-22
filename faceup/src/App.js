import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Button from './components/Button/Button';
//import {PinTest} from "./components/Pin";
import RpiMain from "./components/Rpi_main";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <RpiMain information="Left and Right" />
      </header>
    </div>
  );
}

export default App;
