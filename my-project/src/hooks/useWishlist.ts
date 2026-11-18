import { useEffect, useState } from "react";
import {
  createTradeOffer,
  createWishlistItem,
  deleteWishlistItem,
  getGames,
  getMembers,
  getWishlistItems,
  updateTradeOfferStatus,
  updateWishlistItem,
  type CreateWishlistItem,
  type GameOption,
  type MemberOption,
  type WishlistItem,
  type WishlistItemChanges,
} from "../api/wishlist";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function useWishlist() {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const [games, setGames] = useState<GameOption[]>([]);
  const [members, setMembers] = useState<MemberOption[]>([]);
  const [memberId, setMemberId] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function reloadItems() {
    setItems(await getWishlistItems());
  }

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [wishlistItems, availableGames, availableMembers] = await Promise.all([
          getWishlistItems(),
          getGames(),
          getMembers(),
        ]);
        if (!active) {
          return;
        }

        setItems(wishlistItems);
        setGames(availableGames);
        setMembers(availableMembers);
        setMemberId((currentId) => (
          availableMembers.some((member) => member.id === currentId)
            ? currentId
            : availableMembers[0]?.id ?? currentId
        ));
      } catch (loadError) {
        if (active) {
          setError(getErrorMessage(loadError, "Could not load wishlist data."));
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    void loadData();
    return () => {
      active = false;
    };
  }, []);

  async function addWishlistItem(input: Omit<CreateWishlistItem, "memberId">) {
    setError("");
    try {
      await createWishlistItem({ ...input, memberId });
      await reloadItems();
      return true;
    } catch (saveError) {
      setError(getErrorMessage(saveError, "Could not add wishlist item."));
      return false;
    }
  }

  async function addOffer(itemId: number, requestedGameId: number) {
    setError("");
    try {
      await createTradeOffer(itemId, { proposerId: memberId, requestedGameId });
      await reloadItems();
      return true;
    } catch (saveError) {
      setError(getErrorMessage(saveError, "Could not make trade offer."));
      return false;
    }
  }

  async function changeOfferStatus(
    offerId: number,
    status: "accepted" | "rejected" | "cancelled",
  ) {
    setError("");
    try {
      await updateTradeOfferStatus(offerId, memberId, status);
      await reloadItems();
    } catch (updateError) {
      setError(getErrorMessage(updateError, "Could not update trade offer."));
    }
  }

  async function saveWishlistItem(itemId: number, changes: WishlistItemChanges) {
    setError("");
    try {
      await updateWishlistItem(itemId, {
        ...changes,
        actorMemberId: memberId,
      });
      await reloadItems();
      return true;
    } catch (saveError) {
      setError(getErrorMessage(saveError, "Could not update wishlist item."));
      return false;
    }
  }

  async function removeWishlistItem(itemId: number) {
    setError("");
    try {
      await deleteWishlistItem(itemId, memberId);
      await reloadItems();
    } catch (deleteError) {
      setError(getErrorMessage(deleteError, "Could not delete wishlist item."));
    }
  }

  function selectMember(nextMemberId: number) {
    setMemberId(nextMemberId);
    setError("");
  }

  return {
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
  };
}
