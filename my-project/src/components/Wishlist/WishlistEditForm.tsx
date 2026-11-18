import { useState, type FormEvent } from "react";
import type { GameOption, WishlistItem, WishlistItemChanges } from "../../api/wishlist";

type WishlistEditFormProps = {
  item: WishlistItem;
  games: GameOption[];
  onSave: (changes: WishlistItemChanges) => Promise<boolean>;
  onCancel: () => void;
};

export function WishlistEditForm({ item, games, onSave, onCancel }: WishlistEditFormProps) {
  const [gameId, setGameId] = useState(String(item.gameId));
  const [priority, setPriority] = useState(item.priority);
  const [note, setNote] = useState(item.note);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!gameId || !note.trim()) {
      return;
    }

    await onSave({
      gameId: Number(gameId),
      priority,
      note: note.trim(),
    });
  }

  return (
    <form className="wishlist-edit-form" onSubmit={(event) => void submit(event)}>
      <label>
        Game
        <select
          required
          value={gameId}
          disabled={item.offers.length > 0}
          onChange={(event) => setGameId(event.target.value)}
        >
          {games.map((game) => (
            <option key={game.id} value={game.id}>{game.title} ({game.edition})</option>
          ))}
        </select>
      </label>
      {item.offers.length > 0 && (
        <p className="wishlist-subtitle">The game cannot change after an offer has been made.</p>
      )}
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
          rows={3}
        />
      </label>
      <div className="wishlist-owner-actions">
        <button type="submit">Save changes</button>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
