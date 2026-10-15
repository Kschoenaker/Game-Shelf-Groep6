
import { Routes, Route, Navigate } from "react-router";

import Sidebar from "./components/Sidebar/Sidebar";
import Lending from "./pages/Lending";
import Wishlist from "./pages/Wishlist";

import GameSessionStart from "./pages/GameSessionPages/GameSessionStart";
import CreateGameSession from "./pages/GameSessionPages/CreateGameSessions";
import ManageMySession from "./pages/GameSessionPages/ManageMySession";
import MySessionSignUps from "./pages/GameSessionPages/MySessionSignUps";
import NewGameSessionSignUp from "./pages/GameSessionPages/NewGameSessionSignUp";

import "./App.css";

function App() {
  return (
    <div className="app">
      <Sidebar />

      <main className="main-content">
        <Routes>
          <Route
            path="/"
            element={<Navigate to="/lending" replace />}
          />

          <Route path="/lending" element={<Lending />} />
          <Route path="/wishlists" element={<Wishlist />} />

          {/* Game session pages */}
          <Route
            path="/game-sessions"
            element={<GameSessionStart />}
          />
          <Route
            path="/game-sessions/create"
            element={<CreateGameSession />}
          />
          <Route
            path="/game-sessions/manage"
            element={<ManageMySession />}
          />
          <Route
            path="/game-sessions/sign-ups"
            element={<MySessionSignUps />}
          />
          <Route
            path="/game-sessions/sign-up/new"
            element={<NewGameSessionSignUp />}
          />

          {/* Redirect unknown routes */}
          <Route
            path="*"
            element={<Navigate to="/lending" replace />}
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
