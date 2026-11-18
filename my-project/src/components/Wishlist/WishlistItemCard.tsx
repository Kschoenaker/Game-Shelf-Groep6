import { useState } from "react";
import type { GameOption, WishlistItem, WishlistItemChanges } from "../../api/wishlist";
import { WishlistEditForm } from "./WishlistEditForm";
import { WishlistOfferSection } from "./WishlistOfferSection";

const priorityLabels: Record<number, string> = {
  1: "High",
  2: "Normal",
  3: "Low",
};

type WishlistItemCardProps = {
  item: WishlistItem;
  memberId: number;
  games: GameOption[];
  onUpdate: (itemId: number, changes: WishlistItemChanges) => Promise<boolean>;
  onDelete: (itemId: number) => void;
  onMakeOffer: (itemId: number, requestedGameId: number) => Promise<boolean>;
  onChangeOfferStatus: (offerId: number, status: "accepted" | "rejected" | "cancelled") => void;
};

export function WishlistItemCard({
  item,
  memberId,
  games,
  onUpdate,
  onDelete,
  onMakeOffer,
  onChangeOfferStatus,
}: WishlistItemCardProps) {
  const [editing, setEditing] = useState(false);
  const isOwner = item.memberId === memberId;

  async function saveChanges(changes: WishlistItemChanges) {
    const saved = await onUpdate(item.id, changes);
    if (saved) {
      setEditing(false);
    }
    return saved;
  }

  return (
    <article className={`wishlist-item ${item.isFulfilled ? "fulfilled" : ""}`}>
      <div className="wishlist-item-heading">
        <div>
          <p className="wishlist-priority">{priorityLabels[item.priority] ?? "Normal"} priority</p>
          <h3>{item.game}</h3>
          <p>Wanted by {item.owner}</p>
        </div>
        <span className="wishlist-status">
          {item.isFulfilled ? "Fulfilled" : "Looking for it"}
        </span>
      </div>

      {isOwner && (
        <div className="wishlist-owner-actions">
          <button
            type="button"
            onClick={() => setEditing(true)}
            disabled={item.isFulfilled}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => onDelete(item.id)}
            disabled={item.offers.length > 0}
            title={item.offers.length > 0 ? "Items with trade history cannot be deleted." : undefined}
          >
            Delete
          </button>
        </div>
      )}

      {isOwner && editing ? (
        <WishlistEditForm
          item={item}
          games={games}
          onSave={saveChanges}
          onCancel={() => setEditing(false)}
        />
      ) : (
        <p className="wishlist-note">{item.note}</p>
      )}

      <WishlistOfferSection
        item={item}
        memberId={memberId}
        games={games}
        onMakeOffer={onMakeOffer}
        onChangeOfferStatus={onChangeOfferStatus}
      />
    </article>
  );
}
