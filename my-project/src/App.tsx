import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar/Sidebar";

import GameSessionStart from "./pages/GameSessionPages/GameSessionStart";
import CreateGameSession from "./pages/GameSessionPages/CreateGameSessions";
import ManageMySession from "./pages/GameSessionPages/ManageMySession";
import MySessionSignUps from "./pages/GameSessionPages/MySessionSignUps";
import NewGameSessionSignUp from "./pages/GameSessionPages/NewGameSessionSignUp";

import "./App.css";

export default function App() {
  return (
    <div className="app-layout">
      <Sidebar />

      <main className="app-main">
        <Routes>
          {/* Startpagina */}
          <Route
            path="/"
            element={<Navigate to="/game-sessions" replace />}
          />

          {/* Session_Page 1 */}
          <Route
            path="/game-sessions"
            element={<GameSessionStart />}
          />

          {/* Session_Page 2 */}
          <Route
            path="/game-sessions/create"
            element={<CreateGameSession />}
          />

          {/* Session_Page 3 */}
          <Route
            path="/game-sessions/manage"
            element={<ManageMySession />}
          />

          {/* Session_Page 4 */}
          <Route
            path="/game-sessions/sign-ups"
            element={<MySessionSignUps />}
          />

          {/* Session_Page 5 */}
          <Route
            path="/game-sessions/sign-up/new"
            element={<NewGameSessionSignUp />}
          />
        </Routes>
      </main>
    </div>
  );
}
