import { Link } from "react-router-dom";
import "./GameSessionStart.css";

// alle inhoudelijke lijsten
const actions = [
  {
    title: "Start New Game Session",
    description: "Create a new game session and invite players to join.",
    link: "/game-sessions/create",
    label: "Create session",
    number: "01",
  },
  {
    title: "Manage Game Sessions",
    description: "View, edit and manage the game sessions you organize.",
    link: "/game-sessions/manage",
    label: "Manage sessions",
    number: "02",
  },
  {
    title: "New Game Session Sign Up",
    description: "Discover available sessions and sign up to participate.",
    link: "/game-sessions/sign-up/new",
    label: "Find a session",
    number: "03",
  },
  {
    title: "My Session Sign Ups",
    description: "Check your registrations and see which sessions you joined.",
    link: "/game-sessions/sign-ups",
    label: "View registrations",
    number: "04",
  },
];

export default function GameSessionStart() {
  return (
    <main className="session-page">

      {/* Header */}
      <header className="session-header">
        <div>
          <span className="session-eyebrow">
            GAME SHELF / GameSession
          </span>

          <h1>Game Sessions</h1>

          <p className="session-subtitle">
            Your next adventure starts here. What would you like to do?
          </p>
        </div>

        <div className="session-status">
          <span className="status-dot" />
          Ready to play
        </div>
      </header>

      {/* Introduction */}
      <section className="session-intro">
        <span className="intro-label">YOUR PLAYGROUND</span>

        <h2>Make your next move.</h2>

        <p>
          Organize a game, join your friends, or keep track of your
          upcoming sessions.
        </p>
      </section>

      {/* Navigation cards */}
      <section
        className="session-grid"
        aria-label="Game session options"
      >
        {actions.map((action) => (
          <Link
            to={action.link}
            className="session-card"
            key={action.number}
          >
            <div className="card-top">
              <span className="card-number">
                {action.number}
              </span>
            </div>

            <div className="card-content">
              <h3>{action.title}</h3>
              <p>{action.description}</p>
            </div>

            <div className="card-footer">
              <span>{action.label}</span>
              <span className="card-arrow">→</span>
            </div>
          </Link>
        ))}
      </section>

    </main>
  );
}