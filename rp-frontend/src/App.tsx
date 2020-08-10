import React from 'react';
import { Provider } from 'react-redux'

import { store } from 'store/store'

import 'styles/App.css';

import {Main} from 'views/Main';

const App = () => {
  return (
    <Provider store={store}>
      <div className="Page">
        <Main/>
      </div>
    </Provider>
    
  );
}

export default App;
