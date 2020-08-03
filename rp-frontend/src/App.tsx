import React from 'react';
import 'styles/App.css';

import {Main} from './views/Main';

const App = () => {
  return (
    <div className="Page">
      <div className="titleContent">Titlebar</div>
      <Main/>
    </div>
  );
}

export default App;
