import * as icons from "lucide-react";
import "./Lending.css";

const lendingOptions = [
  {
    title: "Lend a game",
    description: "Share a game from your collection.",
    icon: icons.Gamepad2,
  },
  {
    title: "Borrow a game",
    description: "Find a game you'd love to play.",
    icon: icons.Search,
  },
  {
    title: "My requests",
    description: "Manage your pending requests.",
    icon: icons.ClipboardList,
  },
  {
    title: "My Loans",
    description: "Track games you've lent or borrowed.",
    icon: icons.ArrowLeftRight,
  },
];

function Lending() {
  return (
    <div className="lending-page">
      <header className="lending-header">
        <p className="lending-eyebrow">GAMESHELF / COMMUNITY</p>
        <h1>Lending</h1>
        <p className="lending-subtitle">
          Share games. Discover new adventures.
        </p>
      </header>

      <section className="lending-options">
        {lendingOptions.map((option) => {
          const Icon = option.icon;

          return (
            <button
              className="lending-card"
              key={option.title}
              onClick={() => console.log(`${option.title} selected`)}
            >
              <div className="lending-card-icon">
                <Icon size={28} strokeWidth={1.8} />
              </div>

              <div className="lending-card-text">
                <h2>{option.title}</h2>
                <p>{option.description}</p>
              </div>

              <icons.ArrowUpRight
                className="lending-card-arrow"
                size={22}
              />
            </button>
          );
        })}
      </section>
    </div>
  );
}

export default Lending;