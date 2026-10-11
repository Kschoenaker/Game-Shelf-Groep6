import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Collections from "./components/Collections/Collections";
import AllGames from "./components/All-Games/All-Games";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router";


function App() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const location = useLocation();
    const title = location.pathname === "/games" ? "ALL MY GAMES" : "COLLECTIONS & SHELVES";

    return (
        <div className="app">
            <Sidebar />

            <main className="main-content">
                <Header title={title} viewMode={viewMode} setViewMode={setViewMode} />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <Banner />
                                <Collections viewMode={viewMode} />
                            </>
                        }
                    />
                    <Route path="/games" element={<AllGames />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;