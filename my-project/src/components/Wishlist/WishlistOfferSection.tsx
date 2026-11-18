import { useState } from "react";
import type { GameOption, OfferStatus, WishlistItem } from "../../api/wishlist";

type OfferResponse = Exclude<OfferStatus, "open">;

type WishlistOfferSectionProps = {
  item: WishlistItem;
  memberId: number;
  games: GameOption[];
  onMakeOffer: (itemId: number, requestedGameId: number) => Promise<boolean>;
  onChangeOfferStatus: (offerId: number, status: OfferResponse) => void;
};

export function WishlistOfferSection({
  item,
  memberId,
  games,
  onMakeOffer,
  onChangeOfferStatus,
}: WishlistOfferSectionProps) {
  const [requestedGameId, setRequestedGameId] = useState("");

  async function submitOffer() {
    if (!requestedGameId) {
      return;
    }

    const created = await onMakeOffer(item.id, Number(requestedGameId));
    if (created) {
      setRequestedGameId("");
    }
  }

  return (
    <>
      {item.offers.length > 0 && (
        <div className="wishlist-offers">
          <h4>Offers</h4>
          {item.offers.map((offer) => (
            <div className="wishlist-offer" key={offer.id}>
              <p>
                <strong>{offer.proposer}</strong> offers <strong>{item.game}</strong> for{" "}
                <strong>{offer.requestedGame}</strong>
              </p>
              {offer.status === "open" && item.memberId === memberId ? (
                <div className="wishlist-offer-actions">
                  <button type="button" onClick={() => onChangeOfferStatus(offer.id, "accepted")}>Accept</button>
                  <button type="button" onClick={() => onChangeOfferStatus(offer.id, "rejected")}>Reject</button>
                </div>
              ) : offer.status === "open" && offer.proposerId === memberId ? (
                <div className="wishlist-offer-actions">
                  <button type="button" onClick={() => onChangeOfferStatus(offer.id, "cancelled")}>Cancel</button>
                </div>
              ) : (
                <span className="offer-status">{offer.status}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {!item.isFulfilled && item.memberId !== memberId && (
        <div className="wishlist-trade-form">
          <p>You can offer {item.game}</p>
          <label htmlFor={`offer-${item.id}`}>Game you want in return</label>
          <select
            id={`offer-${item.id}`}
            value={requestedGameId}
            onChange={(event) => setRequestedGameId(event.target.value)}
          >
            <option value="" disabled>Select a catalogue game</option>
            {games.map((game) => (
              <option key={game.id} value={game.id}>{game.title} ({game.edition})</option>
            ))}
          </select>
          <button
            type="button"
            disabled={!requestedGameId}
            onClick={() => void submitOffer()}
          >
            Make offer
          </button>
        </div>
      )}
    </>
  );
}
