import "./Collections.css";
import games from "./games.json";

import { useState } from "react";

// interface ViewMode {
//     name: string;
//     image: string;
// }

type Game = {
    name: string;
    image: string;
    playtime: string;
};

function Collections({ viewMode }: { viewMode: "grid" | "list" }) {
    const [selectedGame, setSelectedGame] = useState<Game | null>(null);

    function showGameDetails(game: Game) {
        setSelectedGame(game);
    }

    function handleGameClick(game: Game) {
        showGameDetails(game);
        console.log(`Clicked on ${game.name}`);
    }

    return (
        <>
            <section className={`collections ${viewMode}`}>
                {games.map((game) => (
                    <div
                        className="game-card"
                        key={game.name}
                        onClick={() => handleGameClick(game)}
                    >
                        <img src={game.image} alt={game.name} />
                        <h3>{game.name}</h3>
                    </div>
                ))}
                <button
                    className="view-all-games-button"
                    type="button"
                    onClick={() => {
                        console.log("Clicked!");
                        <a href="/games">View all games</a>
                    }}
                >
                    View all games
                </button>
            </section>

            {selectedGame && (
                <aside className="game-details">
                    <img src={selectedGame.image} alt={selectedGame.name} />
                    <h2>{selectedGame.name}</h2>
                    <p>Speeltijd: {selectedGame.playtime}</p>
                </aside>
            )}
        </>
    );
}

export default Collections;