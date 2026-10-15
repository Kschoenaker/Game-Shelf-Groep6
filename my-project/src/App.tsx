import "./App.css";
import { Navigate, Route, Routes } from "react-router";
import Sidebar from "./components/Sidebar/Sidebar";
import Lending from "./pages/Lending";
import Wishlist from "./pages/Wishlist";
import CollectionsShelves from "./components/Collections&Shelves/Collections&ShelvesPage";


function App() {
    return (
        <div className="app">
            <Sidebar />

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Navigate to="/lending" replace />} />
                    <Route path="/lending" element={<Lending />} />
                    <Route path="/wishlists" element={<Wishlist />} />
                    <Route path="*" element={<Navigate to="/lending" replace />} />
                </Routes>
                <CollectionsShelves />
            </main>
        </div>
    );
}

export default App;