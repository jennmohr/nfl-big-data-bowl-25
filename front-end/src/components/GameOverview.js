import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const GameOverview = () => {
  const { gameId } = useParams();
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGameData = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/game-overview/${gameId}`
        );
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId]);

  if (loading) return <div>Loading game data...</div>;

  if (!gameData) return <div>Error loading game data.</div>;

  const { game, plays, playerPlays, tracking } = gameData;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">{`Game Overview: ${game.homeTeamAbbr} vs ${game.visitorTeamAbbr}`}</h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-white p-4 shadow rounded">
          <h2 className="text-2xl font-bold mb-4">Game Stats</h2>
          <p>{`Date: ${game.gameDate}`}</p>
          <p>{`Score: ${game.homeFinalScore} - ${game.visitorFinalScore}`}</p>
        </div>
        <div className="col-span-2 bg-gray-200 p-4 rounded">
          <h2 className="text-2xl font-bold mb-4">Analysis Insights</h2>
          {/* Future: Add analysis insights and visualizations */}
        </div>
      </div>
    </div>
  );
};

export default GameOverview;
