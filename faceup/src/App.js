import React from 'react';
import logo from './logo.svg';
import './App.css';
//import Button from './components/Button/Button';
//import {PinTest} from "./components/Pin";
import RpiHeader from "./components/rpiHeader";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <RpiHeader information="Left and Right" />
      </header>
    </div>
  );
}

export default App;
