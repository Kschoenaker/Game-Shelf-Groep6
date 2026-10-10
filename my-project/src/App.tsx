import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Header from "./components/Header/Header";
import Banner from "./components/Banner/Banner";
import Collections from "./components/Collections/Collections";
import { useState } from "react";

function App() {
    const [viewMode, setViewMode] = useState("grid");
    return (
        <div className="app">
            <Sidebar />

            <main className="main-content">
                <Header viewMode={viewMode} setViewMode={setViewMode} />
                <Banner />
                <Collections viewMode={viewMode} />
            </main>
        </div>
    );
}

export default App;