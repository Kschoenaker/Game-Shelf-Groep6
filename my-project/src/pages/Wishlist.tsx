import * as icons from "lucide-react";
import { WishlistCreateForm } from "../components/Wishlist/WishlistCreateForm";
import { WishlistItemCard } from "../components/Wishlist/WishlistItemCard";
import { useWishlist } from "../hooks/useWishlist";
import "./Wishlist.css";

function Wishlist() {
  const {
    items,
    games,
    members,
    memberId,
    loading,
    error,
    selectMember,
    addWishlistItem,
    addOffer,
    changeOfferStatus,
    saveWishlistItem,
    removeWishlistItem,
  } = useWishlist();

  return (
    <div className="wishlist-page">
      <header className="wishlist-header">
        <p className="wishlist-eyebrow">GAMESHELF / COMMUNITY</p>
        <h1>Wishlists &amp; Trading</h1>
        <p className="wishlist-subtitle">
          See what members are looking for and offer a game in return.
        </p>
      </header>

      <div className="wishlist-demo-member">
        <label htmlFor="wishlist-member">
          Development member (login is not connected yet)
        </label>
        <select
          id="wishlist-member"
          value={memberId}
          onChange={(event) => selectMember(Number(event.target.value))}
          disabled={members.length === 0}
        >
          {members.map((member) => (
            <option key={member.id} value={member.id}>{member.name}</option>
          ))}
        </select>
      </div>

      {error && <p className="wishlist-error" role="alert">{error}</p>}

      <section className="wishlist-layout">
        <WishlistCreateForm
          games={games}
          loading={loading}
          onCreate={addWishlistItem}
        />

        <section className="wishlist-list">
          <div className="wishlist-section-heading">
            <icons.List size={22} />
            <h2>Community wishlist</h2>
          </div>

          {loading && <p className="wishlist-subtitle">Loading wishlist…</p>}
          {!loading && items.length === 0 && (
            <p className="wishlist-empty">No wishlist items yet. Add the first one.</p>
          )}

          {items.map((item) => (
            <WishlistItemCard
              key={`${memberId}-${item.id}`}
              item={item}
              memberId={memberId}
              games={games}
              onUpdate={saveWishlistItem}
              onDelete={(itemId) => void removeWishlistItem(itemId)}
              onMakeOffer={addOffer}
              onChangeOfferStatus={changeOfferStatus}
            />
          ))}
        </section>
      </section>
    </div>
  );
}

export default Wishlist;
