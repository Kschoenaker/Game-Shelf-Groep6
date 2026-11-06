import games from "../Collections/games.json";
import "../Collections/Collections.css";

function AllGames() {
    return (
        <main className="all-games-page">
            <section className="collection-games grid">
                {games.map((game) => (
                    <div className="collection-game-card" key={game.name}>
                        <img src={game.image} alt={game.name} />
                        <h3>{game.name}</h3>
                        <p>Speeltijd: {game.playtime}</p>
                    </div>
                ))}
            </section>
        </main>
    );
}

export default AllGames;