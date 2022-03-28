export interface RoomProps {
  admin: string
  id: string
  game: string
  players: Record<string, { alias: string; answer?: string }>
  status: string
}

export interface PlayerType {
  alias: string
  answer?: string
  id?: string
}

export interface ScoreType {
  id: string
  alias: string
  score: number
}

export interface ScoresType {
  id: string
  alias: string
  played?: number
  board: Record<string, ScoreType>
}
