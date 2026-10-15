import games from "../Collections/games.json";
import "../Collections/Collections.css";

function AllGames() {
    return (
        <section className="collections grid">
            {games.map((game) => (
                <div className="game-card" key={game.name}>
                    <img src={game.image} alt={game.name} />
                    <h3>{game.name}</h3>
                    <p>Speeltijd: {game.playtime}</p>
                </div>
            ))}
        </section>
    );
}

export default AllGames;