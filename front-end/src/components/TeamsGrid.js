import React from "react";
import { useNavigate } from "react-router-dom";

const teams = [
  { abbreviation: "ARI", fullName: "Arizona Cardinals", color: "#97233F" },
  { abbreviation: "ATL", fullName: "Atlanta Falcons", color: "#A71930" },
  { abbreviation: "BAL", fullName: "Baltimore Ravens", color: "#241773" },
  { abbreviation: "BUF", fullName: "Buffalo Bills", color: "#00338D" },
  { abbreviation: "CAR", fullName: "Carolina Panthers", color: "#0085CA" },
  { abbreviation: "CHI", fullName: "Chicago Bears", color: "#C83803" },
  { abbreviation: "CIN", fullName: "Cincinnati Bengals", color: "#FB4F14" },
  { abbreviation: "CLE", fullName: "Cleveland Browns", color: "#311D00" },
  { abbreviation: "DAL", fullName: "Dallas Cowboys", color: "#041E42" },
  { abbreviation: "DEN", fullName: "Denver Broncos", color: "#FB4F14" },
  { abbreviation: "DET", fullName: "Detroit Lions", color: "#0076B6" },
  { abbreviation: "GB", fullName: "Green Bay Packers", color: "#203731" },
  { abbreviation: "HOU", fullName: "Houston Texans", color: "#03202F" },
  { abbreviation: "IND", fullName: "Indianapolis Colts", color: "#002C5F" },
  { abbreviation: "JAX", fullName: "Jacksonville Jaguars", color: "#006778" },
  { abbreviation: "KC", fullName: "Kansas City Chiefs", color: "#E31837" },
  { abbreviation: "LA", fullName: "Los Angeles Rams", color: "#003594" },
  { abbreviation: "LAC", fullName: "Los Angeles Chargers", color: "#0080C6" },
  { abbreviation: "LV", fullName: "Las Vegas Raiders", color: "#000000" },
  { abbreviation: "MIA", fullName: "Miami Dolphins", color: "#008E97" },
  { abbreviation: "MIN", fullName: "Minnesota Vikings", color: "#4F2683" },
  { abbreviation: "NE", fullName: "New England Patriots", color: "#002244" },
  { abbreviation: "NO", fullName: "New Orleans Saints", color: "#D3BC8D" },
  { abbreviation: "NYG", fullName: "New York Giants", color: "#0B2265" },
  { abbreviation: "NYJ", fullName: "New York Jets", color: "#125740" },
  { abbreviation: "PHI", fullName: "Philadelphia Eagles", color: "#004C54" },
  { abbreviation: "PIT", fullName: "Pittsburgh Steelers", color: "#FFB612" },
  { abbreviation: "SEA", fullName: "Seattle Seahawks", color: "#002244" },
  { abbreviation: "SF", fullName: "San Francisco 49ers", color: "#AA0000" },
  { abbreviation: "TB", fullName: "Tampa Bay Buccaneers", color: "#D50A0A" },
  { abbreviation: "TEN", fullName: "Tennessee Titans", color: "#4B92DB" },
  { abbreviation: "WAS", fullName: "Washington Commanders", color: "#773141" },
];

const TeamsGrid = () => {
  const navigate = useNavigate();

  const handleTeamClick = (team) => {
    navigate(`/overview/${team.abbreviation}`, {
      state: { color: team.color },
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="grid grid-cols-3 gap-6 p-6 w-full max-w-5xl">
        {teams.map((team) => (
          <div
            key={team.abbreviation}
            className="text-white font-bold py-6 px-8 text-center rounded-lg cursor-pointer hover:opacity-90 transition duration-200"
            style={{ backgroundColor: team.color }}
            onClick={() => handleTeamClick(team)}
          >
            {team.fullName}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsGrid;
