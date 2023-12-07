import React, { useEffect, useState } from 'react';
import Score, { ScoreData } from '../Score/Score';

const LeaderBoard: React.FC = () => {
  const [scores, setScores] = useState<ScoreData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const requestOptions: RequestInit = {
          method: 'GET',
          redirect: 'follow' as RequestRedirect // Explicitly specify the type
        };

        const response = await fetch("http://localhost:3000/scores", requestOptions);
        const data = await response.json();
        console.log('data', data);

        // Assuming the API response is an array of score objects
        const formattedData: ScoreData[] = data.map((score: any) => ({
          name: score.name,
          points: score.points,
        }));

        // Tri des scores par ordre décroissant
        const sortedScores = formattedData.sort((a, b) => b.points - a.points);

        // Sélection des 6 premiers scores
        const top6Scores = sortedScores.slice(0, 6);

        setScores(top6Scores);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <div className="leaderboard-list">
        {scores.map((score, index) => (
          <Score key={index} name={score.name} points={score.points} />
        ))}
      </div>
    </div>
  );
};

export default LeaderBoard;
