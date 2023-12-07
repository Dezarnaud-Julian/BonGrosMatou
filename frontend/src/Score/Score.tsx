import React from 'react';
import './Score.css'; // You can create a separate CSS file for styling

export type ScoreData = {
  name: string;
  points: number;
};

const Score: React.FC<ScoreData> = ({ name, points }) => {
  return (
    <div className="score-container">
      <div className="score-rectangle">
        <p className="score-name">{name}</p>
        <p className="score-value">{points}</p>
      </div>
    </div>
  );
};

export default Score;
