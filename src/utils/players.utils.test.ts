import { GetNextPlayerToPlay } from './players.utils'

const board = {
  'player-1': {
    id: 'player-1',
    alias: 'player-1',
    score: 1,
  },
  'player-2': {
    id: 'player-2',
    alias: 'player-2',
    score: 2,
  },
  'player-3': {
    id: 'player-3',
    alias: 'player-3',
    score: 3,
  },
}

describe('Utils: Players', () => {
  describe('GetNextPlayerToPlay', () => {
    test('it should return a random player', () => {
      expect(
        GetNextPlayerToPlay({
          'player-1': {
            id: 'player-1',
            alias: 'player-1',
            board,
            played: 1,
          },
          'player-2': {
            id: 'player-2',
            alias: 'player-2',
            board,
            played: 2,
          },
          'player-3': {
            id: 'player-3',
            alias: 'player-3',
            board,
            played: 3,
          },
        })
      ).toBe('player-1')

      expect(
        GetNextPlayerToPlay({
          'player-1': {
            id: 'player-1',
            alias: 'player-1',
            board,
            played: 2,
          },
          'player-2': {
            id: 'player-2',
            alias: 'player-2',
            board,
            played: 1,
          },
          'player-3': {
            id: 'player-3',
            alias: 'player-3',
            board,
            played: 3,
          },
        })
      ).toBe('player-2')

      expect(
        GetNextPlayerToPlay({
          'player-1': {
            id: 'player-1',
            alias: 'player-1',
            board,
            played: 2,
          },
          'player-2': {
            id: 'player-2',
            alias: 'player-2',
            board,
            played: 1,
          },
          'player-3': {
            id: 'player-3',
            alias: 'player-3',
            board,
            played: 1,
          },
        })
      ).toBe('player-2')

      expect(
        GetNextPlayerToPlay({
          'player-1': {
            id: 'player-1',
            alias: 'player-1',
            board,
            played: 2,
          },
          'player-2': {
            id: 'player-2',
            alias: 'player-2',
            board,
            played: 1,
          },
          'player-3': {
            id: 'player-3',
            alias: 'player-3',
            board,
          },
        })
      ).toBe('player-3')
    })
  })
})
