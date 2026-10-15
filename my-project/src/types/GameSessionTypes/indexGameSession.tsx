
export type SessionPlace = "club_room" | "home";

export type GameSession = { 
  id: string;
  hostId: string;
  title: string;
  dateTime: string;
  place: SessionPlace;
  capacity: number;
  cancelled: boolean;
}

