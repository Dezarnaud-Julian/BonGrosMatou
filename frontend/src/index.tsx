import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import Score from './Score/Score';
import Leaderboard from "./Leaderboard/Leaderboard";
import reportWebVitals from './reportWebVitals';
import AppHeader from "./header/header";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Wrapping App with a div as a container

root.render(
      <div className="container">
          <div className="left">
              <AppHeader></AppHeader>
              <div className="content">
                <div className="app-container">
                  <App />
                </div>
              </div>
          </div>
          <div className="right">
              <div className="MenuDeroulant">
                  <h4>Pseudo : </h4>
                  <div>
                      <input type="text" placeholder="Veuillez entrez votre pseudo"/>
                      <button>Enter</button>
                  </div>

              </div>
              <div className="sidebar">
                <Leaderboard />
              </div>
          </div>
      </div>
);
reportWebVitals();
