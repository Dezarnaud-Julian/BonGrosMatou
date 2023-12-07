import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Score from './Score/Score';
import reportWebVitals from './reportWebVitals';
import App from './App/App';
import Leaderboard from './Leaderboard/Leaderboard';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Wrapping App with a div as a container
root.render(
    <div className="container">
      <h1>You are a ball of paper, go into the yellow bin</h1>
      <div className="content">
        <div className="app-container">
          <App />
        </div>
        <div className="sidebar">
          <Leaderboard />
        </div>
      </div>
    </div>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
