import React from 'react';
import './styles/App.css';

import {Board} from './components/board';

const App = () => {
  return (
    <div className="Page">
      <div className="titleContent">Titlebar</div>
      <Board/>
    </div>
  );
}

export default App;
