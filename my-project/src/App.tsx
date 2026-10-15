
import { Routes, Route, Navigate } from "react-router";

import Sidebar from "./components/Sidebar/Sidebar";
import Lending from "./pages/Lending";
import Wishlist from "./pages/Wishlist";
import GameSessionStart from "./pages/GameSessionPages/GameSessionStart";
import CreateGameSession from "./pages/GameSessionPages/CreateGameSessions";
import ManageMySession from "./pages/GameSessionPages/ManageMySession";
import MySessionSignUps from "./pages/GameSessionPages/MySessionSignUps";
import NewGameSessionSignUp from "./pages/GameSessionPages/NewGameSessionSignUp";
import CollectionsShelves from "./components/Collections&Shelves/Collections&ShelvesPage";
import Home from "./components/Collections&Shelves/Home/home";
import AllGames from "./components/Collections&Shelves/All-Games/All-Games";

import "./App.css";

export default function App() {
    return (
        <div className="app">
            <Sidebar />

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/home" replace />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/collections&shelves" element={<CollectionsShelves />} />
                    <Route path="/shelves" element={<CollectionsShelves />} />
                    <Route path="/games" element={<AllGames />} />
                    <Route path="/lending" element={<Lending />} />
                    <Route path="/wishlists" element={<Wishlist />} />
                    <Route path="/game-sessions" element={<GameSessionStart />} />
                    <Route path="/game-sessions/create" element={<CreateGameSession />} />
                    <Route path="/game-sessions/manage" element={<ManageMySession />} />
                    <Route path="/game-sessions/sign-ups" element={<MySessionSignUps />} />
                    <Route path="/game-sessions/sign-up/new" element={<NewGameSessionSignUp />} />
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </main>
        </div>
    );
}
