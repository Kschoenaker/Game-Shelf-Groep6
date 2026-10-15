import "./Header.css";
import { Search, Grid2X2, List } from "lucide-react";

function Header({
    title,
    viewMode,
    setViewMode,
    }: { title: string; viewMode: "grid" | "list"; setViewMode: (mode: "grid" | "list") => void }) {
    return (
        <main className="header">
            <div className="header-header">
                <h2>{title}</h2>

                <div className="search-bar">
                    <Search />
                    <input type="text" placeholder="Search..." />
                </div>

                <div className="view-switcher">
                    <button
                        className={viewMode === "grid" ? "active" : ""}
                        onClick={() => setViewMode("grid")}
                    >
                        <Grid2X2 />
                    </button>
                    <button
                        className={viewMode === "list" ? "active" : ""}
                        onClick={() => setViewMode("list")}
                    >
                        <List />
                    </button>
                </div>
            </div>
        </main>
    );
}

export default Header;