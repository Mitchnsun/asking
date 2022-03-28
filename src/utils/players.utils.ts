import { ScoresType } from '@/types/Room'

export const GetNextPlayerToPlay = (data: Record<string, ScoresType>): string => {
  const listPlayers: ScoresType[] = Object.values(data)
  const randomPlayer = listPlayers.sort((a, b) => (a.played || 0) - (b.played || 0))[0]

  return randomPlayer.id
}
