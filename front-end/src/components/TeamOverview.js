import React, { useEffect, useState } from "react";
import { useParams, Link, useLocation } from "react-router-dom";

const teamNames = {
  ARI: "Arizona Cardinals",
  ATL: "Atlanta Falcons",
  BAL: "Baltimore Ravens",
  BUF: "Buffalo Bills",
  CAR: "Carolina Panthers",
  CHI: "Chicago Bears",
  CIN: "Cincinnati Bengals",
  CLE: "Cleveland Browns",
  DAL: "Dallas Cowboys",
  DEN: "Denver Broncos",
  DET: "Detroit Lions",
  GB: "Green Bay Packers",
  HOU: "Houston Texans",
  IND: "Indianapolis Colts",
  JAX: "Jacksonville Jaguars",
  KC: "Kansas City Chiefs",
  LA: "Los Angeles Rams",
  LAC: "Los Angeles Chargers",
  LV: "Las Vegas Raiders",
  MIA: "Miami Dolphins",
  MIN: "Minnesota Vikings",
  NE: "New England Patriots",
  NO: "New Orleans Saints",
  NYG: "New York Giants",
  NYJ: "New York Jets",
  PHI: "Philadelphia Eagles",
  PIT: "Pittsburgh Steelers",
  SEA: "Seattle Seahawks",
  SF: "San Francisco 49ers",
  TB: "Tampa Bay Buccaneers",
  TEN: "Tennessee Titans",
  WAS: "Washington Commanders",
};

const TeamOverview = () => {
  const { teamAbbreviation } = useParams();
  const { state } = useLocation();
  const brandingColor = state?.color || "#000"; // Fallback to black if no color is passed
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:5000/api/games/${teamAbbreviation}`
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
        setGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [teamAbbreviation]);

  const teamName = teamNames[teamAbbreviation] || teamAbbreviation;

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">
        {teamName} Overview
      </h1>
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-1 bg-white shadow p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Game Schedule</h2>
          <ul>
            {games.map((game) => (
              <li key={game.gameId} className="mb-4">
                <Link
                  to={`/overview/${teamAbbreviation}/${game.gameId}`}
                  className="font-bold hover:underline"
                  style={{ color: brandingColor }}
                >
                  Week {game.week} - {game.gameDate}
                </Link>
                <p className="text-sm text-gray-600">
                  {game.homeTeamAbbr} ({game.homeFinalScore}) vs{" "}
                  {game.visitorTeamAbbr} ({game.visitorFinalScore})
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-span-2 bg-gray-200 p-4 rounded-lg">
          {/* Reserved for future content */}
        </div>
      </div>
    </div>
  );
};

export default TeamOverview;
