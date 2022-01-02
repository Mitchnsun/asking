export interface RoomProps {
  admin: string
  id: string
  game: string
  players: Record<string, { alias: string }>
  status: string
}
