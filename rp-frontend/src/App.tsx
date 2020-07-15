import React from 'react';
import './App.css';

// import './components/sidebar';
// import './components/drawnboard';

function App() {
  return (
    <div className="Page">
      <div className="titleContent">Titlebar</div>
      <div className="bodyContent">
        <div className="sidebarContent">
          Sidebar content
        </div>
        <div className="mainContent">
          Main Body
        </div>
      </div>
    </div>
  );
}

export default App;
