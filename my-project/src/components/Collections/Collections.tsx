import "./Collections.css";
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

    const games = [
        {
            "name": "Resident Evil 7",
            "image": "/games/resident-evil-7.jpg",
            "playtime": "10 hours"
        },
        {
            "name": "Resident Evil 2",
            "image": "/games/resident-evil-7.jpg",
            "playtime": "15 hours"
        },
        {
            "name": "Resident Evil 1",
            "image": "/games/resident-evil-7.jpg",
            "playtime": "20 hours"
        },
        {
            "name": "Resident Evil 0",
            "image": "/games/resident-evil-7.jpg",
            "playtime": "25 hours"
        }
    ];

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