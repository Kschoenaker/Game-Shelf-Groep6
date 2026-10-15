import "../../App.css";
import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "./Header/Header";
import Banner from "./Banner/Banner";
import Collections from "./Collections/Collections";
import AllGames from "./All-Games/All-Games";
import { useState } from "react";
import { Routes, Route, useLocation } from "react-router";


function CollectionsShelves() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const location = useLocation();
    const title =
        location.pathname === "/games"
            ? "ALL MY GAMES"
            : location.pathname === "/shelves"
              ? "SHELVES"
              : location.pathname === "/home"
              ? "Home"
              : "COLLECTIONS & SHELVES";
    
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
                    <Route
                        path="/collections&shelves"
                        element={
                            <>
                                <Banner />
                                <Collections viewMode={viewMode} />
                            </>
                        }
                    />
                    <Route path="/games" element={<AllGames />} />
                    <Route path="/shelves" element={<Collections viewMode={viewMode} />} />
                </Routes> 
            </main>
        </div>
    );
}

export default CollectionsShelves;