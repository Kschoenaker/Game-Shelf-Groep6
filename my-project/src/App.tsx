import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar/Sidebar";
import Lending from "./pages/Lending";
import Wishlist from "./pages/Wishlist";
import CollectionsShelves from "./components/Collections&Shelves/Collections&ShelvesPage";


import Home from "./components/Collections&Shelves/Home/home";
import AllGames from "./components/Collections&Shelves/All-Games/All-Games";

function App() {
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
                    <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;