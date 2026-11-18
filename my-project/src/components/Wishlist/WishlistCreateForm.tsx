import { useState, type FormEvent } from "react";
import * as icons from "lucide-react";
import type { GameOption } from "../../api/wishlist";

type NewWishlistItem = {
  gameId: number;
  priority: number;
  note: string;
};

type WishlistCreateFormProps = {
  games: GameOption[];
  loading: boolean;
  onCreate: (item: NewWishlistItem) => Promise<boolean>;
};

export function WishlistCreateForm({ games, loading, onCreate }: WishlistCreateFormProps) {
  const [gameId, setGameId] = useState("");
  const [priority, setPriority] = useState(2);
  const [note, setNote] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!gameId || !note.trim()) {
      return;
    }

    const created = await onCreate({
      gameId: Number(gameId),
      priority,
      note: note.trim(),
    });

    if (created) {
      setGameId("");
      setPriority(2);
      setNote("");
    }
  }

  return (
    <form className="wishlist-form" onSubmit={(event) => void submit(event)}>
      <div className="wishlist-section-heading">
        <icons.Heart size={22} />
        <h2>Add to your wishlist</h2>
      </div>

      <label>
        Game
        <select
          required
          value={gameId}
          onChange={(event) => setGameId(event.target.value)}
          disabled={games.length === 0}
        >
          <option value="" disabled>Select a catalogue game</option>
          {games.map((game) => (
            <option key={game.id} value={game.id}>{game.title} ({game.edition})</option>
          ))}
        </select>
      </label>

      <label>
        Priority
        <select
          required
          value={priority}
          onChange={(event) => setPriority(Number(event.target.value))}
        >
          <option value={1}>High</option>
          <option value={2}>Normal</option>
          <option value={3}>Low</option>
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

      <button className="wishlist-submit" type="submit" disabled={loading || games.length === 0}>
        <icons.Plus size={18} /> Add wishlist item
      </button>
    </form>
  );
}
