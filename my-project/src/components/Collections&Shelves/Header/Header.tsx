import "./Header.css";
import { Search, Grid2X2, List } from "lucide-react";

function Header({
    title,
    viewMode,
    setViewMode,
    }: { title: string; viewMode: "grid" | "list"; setViewMode: (mode: "grid" | "list") => void }) {
    return (
        <header className="shelves-header">
            <div className="shelves-header-bar">
                <h1>{title}</h1>

                <label className="shelves-search">
                    <Search />
                    <input type="search" placeholder="Search..." aria-label="Search games" />
                </label>

                <div className="shelves-view-switcher" aria-label="Choose display mode">
                    <button
                        type="button"
                        className={viewMode === "grid" ? "active" : ""}
                        aria-label="Grid view"
                        aria-pressed={viewMode === "grid"}
                        onClick={() => setViewMode("grid")}
                    >
                        <Grid2X2 />
                    </button>
                    <button
                        type="button"
                        className={viewMode === "list" ? "active" : ""}
                        aria-label="List view"
                        aria-pressed={viewMode === "list"}
                        onClick={() => setViewMode("list")}
                    >
                        <List />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;