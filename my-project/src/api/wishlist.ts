import { request } from "./http";

export type OfferStatus = "open" | "accepted" | "rejected" | "cancelled";

export type TradeOffer = {
  id: number;
  proposerId: number;
  proposer: string;
  requestedGameId: number;
  requestedGame: string;
  madeAt: string;
  status: OfferStatus;
};

export type WishlistItem = {
  id: number;
  memberId: number;
  owner: string;
  gameId: number;
  game: string;
  priority: number;
  note: string;
  isFulfilled: boolean;
  offers: TradeOffer[];
};

export type GameOption = {
  id: number;
  title: string;
  edition: string;
};

export type MemberOption = {
  id: number;
  name: string;
};

export type CreateWishlistItem = {
  memberId: number;
  gameId: number;
  priority: number;
  note: string;
};

export type WishlistItemChanges = {
  gameId: number;
  priority: number;
  note: string;
};

export type UpdateWishlistItem = WishlistItemChanges & {
  actorMemberId: number;
};

export type CreateTradeOffer = {
  proposerId: number;
  requestedGameId: number;
};

export async function getWishlistItems(): Promise<WishlistItem[]> {
  return request<WishlistItem[]>("/api/wishlistitems");
}

export async function getGames(): Promise<GameOption[]> {
  return request<GameOption[]>("/api/games");
}

export async function getMembers(): Promise<MemberOption[]> {
  return request<MemberOption[]>("/api/members");
}

export async function createWishlistItem(input: CreateWishlistItem): Promise<WishlistItem> {
  return request<WishlistItem>("/api/wishlistitems", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateWishlistItem(
  id: number,
  input: UpdateWishlistItem,
): Promise<WishlistItem> {
  return request<WishlistItem>(`/api/wishlistitems/${id}`, {
    method: "PUT",
    body: JSON.stringify(input),
  });
}

export async function deleteWishlistItem(id: number, actorMemberId: number): Promise<void> {
  return request<void>(`/api/wishlistitems/${id}?actorMemberId=${actorMemberId}`, {
    method: "DELETE",
  });
}

export async function createTradeOffer(
  wishlistItemId: number,
  input: CreateTradeOffer,
): Promise<TradeOffer> {
  return request<TradeOffer>(`/api/wishlistitems/${wishlistItemId}/offers`, {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export async function updateTradeOfferStatus(
  offerId: number,
  actorMemberId: number,
  status: Exclude<OfferStatus, "open">,
): Promise<TradeOffer> {
  return request<TradeOffer>(`/api/tradeoffers/${offerId}/status`, {
    method: "PUT",
    body: JSON.stringify({ actorMemberId, status }),
  });
}
