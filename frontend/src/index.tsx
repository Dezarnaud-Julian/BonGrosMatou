import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import Score from './Score/Score';
import Leaderboard from "./Leaderboard/Leaderboard";
import reportWebVitals from './reportWebVitals';
import AppHeader from "./header/header";

// Create a global variable to store the pseudo
export let globalPseudo = "";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Wrapping App with a div as a container

const MainApp = () => {
  // State to store the pseudo
  const [pseudo, setPseudo] = useState("");

  // Function to handle the pseudo input change
  const handlePseudoChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setPseudo(event.target.value);
  };

  // Function to handle the "Enter" button click
  const handleEnterClick = () => {
    // Save the pseudo in the global variable
    globalPseudo = pseudo;
    // You can perform any other actions with the pseudo here
  };

  return (
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
            <input
              type="text"
              placeholder="Veuillez entrer votre pseudo"
              value={pseudo}
              onChange={handlePseudoChange}
            />
            <button onClick={handleEnterClick}>Enter</button>
          </div>
        </div>
        <div className="sidebar">
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

root.render(<MainApp />);
reportWebVitals();
