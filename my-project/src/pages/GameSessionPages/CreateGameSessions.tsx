
import SessionForm from "../../components/GameSession/SessionForm";

export default function CreateGameSession() {
  return (
    <main className="session-page">
      <header className="session-header">
        <div>
          <span className="session-eyebrow">
            GAME SHELF / GameSession / New Game Session
          </span>

          <h1>Start a new session</h1>

          <p className="session-subtitle">
            Ready to start an awesome new game session?
          </p>
        </div>
      </header>

      <section>
        <SessionForm
          onCreate={(data) => {
            console.log("New game session:", data);
          }}
        />
      </section>

      <footer>
        {/* Eventuele footerinhoud */}
      </footer>
    </main>
  );
}
