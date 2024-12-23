import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import TeamsGrid from "./components/TeamsGrid";
import TeamOverview from "./components/TeamOverview";
import GameOverview from "./components/GameOverview";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<TeamsGrid />} />
            <Route
              path="/overview/:teamAbbreviation"
              element={<TeamOverview />}
            />
            <Route
              path="/overview/:teamAbbreviation/:gameId"
              element={<GameOverview />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
