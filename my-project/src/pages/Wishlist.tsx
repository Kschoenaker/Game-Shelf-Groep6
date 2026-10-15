import { useState } from "react";
import * as icons from "lucide-react";
import "./Wishlist.css";

type Offer = {
  id: number;
  member: string;
  requestedGame: string;
  status: "open" | "accepted" | "rejected" | "cancelled";
};

type WishlistItem = {
  id: number;
  game: string;
  owner: string;
  priority: string;
  note: string;
  fulfilled: boolean;
  offers: Offer[];
};

const startingItems: WishlistItem[] = [
  {
    id: 1,
    game: "Monopoly Classic",
    owner: "Noor",
    priority: "High",
    note: "English edition. Good condition is fine.",
    fulfilled: false,
    offers: [
      { id: 1, member: "Milan", requestedGame: "Monopoly Deal", status: "open" },
    ],
  },
  {
    id: 2,
    game: "Monopoly Builder",
    owner: "Rafael",
    priority: "Normal",
    note: "Also looking for friends to play it with.",
    fulfilled: false,
    offers: [],
  },
  {
    id: 3,
    game: "Monopoly Junior",
    owner: "Iris",
    priority: "Low",
    note: "Any language is okay, as long as the cards are complete.",
    fulfilled: true,
    offers: [
      { id: 2, member: "Daan", requestedGame: "Monopoly Speed", status: "accepted" },
    ],
  },
];

function Wishlist() {
  // The page owns the list so adding an item redraws the community list.
  const [items, setItems] = useState(startingItems);
  const [game, setGame] = useState("");
  const [priority, setPriority] = useState("Normal");
  const [note, setNote] = useState("");
  const [offerGames, setOfferGames] = useState<Record<number, string>>({});

  function addWishlistItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Do not add an empty wishlist item.
    if (game.trim() === "" || note.trim() === "") {
      return;
    }

    const newItem: WishlistItem = {
      id: Date.now(),
      game: game.trim(),
      owner: "You",
      priority,
      note: note.trim(),
      fulfilled: false,
      offers: [],
    };

    setItems([...items, newItem]);
    setGame("");
    setPriority("Normal");
    setNote("");
  }

  function updateOffer(itemId: number, offerId: number, status: "accepted" | "rejected") {
    // Make a new array so React knows the offer changed.
    setItems(items.map((item) => {
      if (item.id !== itemId) {
        return item;
      }

      return {
        ...item,
        fulfilled: status === "accepted",
        offers: item.offers.map((offer) =>
          offer.id === offerId ? { ...offer, status } : offer,
        ),
      };
    }));
  }

  function addOffer(itemId: number) {
    const requestedGame = offerGames[itemId]?.trim();

    if (!requestedGame) {
      return;
    }

    setItems(items.map((item) => {
      if (item.id !== itemId || item.fulfilled) {
        return item;
      }

      return {
        ...item,
        offers: [
          ...item.offers,
          { id: Date.now(), member: "You", requestedGame, status: "open" },
        ],
      };
    }));

    setOfferGames({ ...offerGames, [itemId]: "" });
  }

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <p className="wishlist-eyebrow">GAMESHELF / COMMUNITY</p>
        <h1>Wishlists & Trading</h1>
        <p className="wishlist-subtitle">
          See what members are looking for and offer a game in return.
        </p>
      </header>

      <section className="wishlist-layout">
        <form className="wishlist-form" onSubmit={addWishlistItem}>
          <div className="wishlist-section-heading">
            <icons.Heart size={22} />
            <h2>Add to your wishlist</h2>
          </div>

          <label>
            Game
            <input
              type="text"
              required
              maxLength={40}
              value={game}
              onChange={(event) => setGame(event.target.value)}
              placeholder="For example: Cascadia"
            />
          </label>

          <label>
            Priority
            <select
              required
              value={priority}
              onChange={(event) => setPriority(event.target.value)}
            >
              <option>High</option>
              <option>Normal</option>
              <option>Low</option>
            </select>
          </label>

          <label>
            Note: edition and condition
            <textarea
              required
              maxLength={160}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              placeholder="Edition or condition you want"
              rows={4}
            />
          </label>

          <button className="wishlist-submit" type="submit">
            <icons.Plus size={18} /> Add wishlist item
          </button>
        </form>

        <section className="wishlist-list">
          <div className="wishlist-section-heading">
            <icons.List size={22} />
            <h2>Community wishlist</h2>
          </div>

          {items.map((item) => (
            <article className={`wishlist-item ${item.fulfilled ? "fulfilled" : ""}`} key={item.id}>
              <div className="wishlist-item-heading">
                <div>
                  <p className="wishlist-priority">{item.priority} priority</p>
                  <h3>{item.game}</h3>
                  <p>Wanted by {item.owner}</p>
                </div>
                <span className="wishlist-status">
                  {item.fulfilled ? "Fulfilled" : "Looking for it"}
                </span>
              </div>

              <p className="wishlist-note">{item.note}</p>

              {item.offers.length > 0 && (
                <div className="wishlist-offers">
                  <h4>Offers</h4>
                  {item.offers.map((offer) => (
                    <div className="wishlist-offer" key={offer.id}>
                      <p>
                        <strong>{offer.member}</strong> offers <strong>{item.game}</strong> and asks for <strong>{offer.requestedGame}</strong>
                      </p>
                      {offer.status === "open" ? (
                        <div className="wishlist-offer-actions">
                          {/* TODO: show these actions only to the wishlist owner. */}
                          <button type="button" onClick={() => updateOffer(item.id, offer.id, "accepted")}>Accept</button>
                          <button type="button" onClick={() => updateOffer(item.id, offer.id, "rejected")}>Reject</button>
                        </div>
                      ) : (
                        <span className="offer-status">{offer.status}</span>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {!item.fulfilled && (
                <div className="wishlist-trade-form">
                  <p>You can offer {item.game}</p>
                  <label htmlFor={`offer-${item.id}`}>Game you want in return</label>
                  <input
                    id={`offer-${item.id}`}
                    type="text"
                    maxLength={40}
                    value={offerGames[item.id] ?? ""}
                    onChange={(event) => setOfferGames({
                      ...offerGames,
                      [item.id]: event.target.value,
                    })}
                    placeholder="For example: Monopoly Deal"
                  />
                  <button type="button" onClick={() => addOffer(item.id)}>Make offer</button>
                </div>
              )}
            </article>
          ))}
        </section>
      </section>
    </div>
  );
}

export default Wishlist;