export interface RoomProps {
  id: string
  admin: string
  game: string
  players: Record<string, { alias: string }>
}
