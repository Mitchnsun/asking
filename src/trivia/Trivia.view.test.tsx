/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Trivia from './Trivia.view'

const props = {
  id: '1234',
  question: 'Quel est le premier président de la Vième République ?',
  category: 'HIS',
}

const mockAxios = jest.fn()

jest.mock('axios', () => ({
  post: (url: string, params: unknown) => mockAxios(url, params),
}))

jest.mock('next/link', () => {
  return ({ children }: { children: JSX.Element }): JSX.Element => {
    return children
  }
})

describe('Trivia.view', () => {
  beforeEach(() => {
    mockAxios.mockClear()
  })

  test('it should submit the answer', async () => {
    const user = userEvent.setup()
    mockAxios.mockResolvedValue({
      data: {
        success: true,
        answers: ['Answer1', 'Answer2', 'Answer3'],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        selection: { answer: 'Answer2' },
        wiki: 'https://fr.wikipedia.org/wiki/Rickroll',
      },
    })
    render(<Trivia {...props} />)

    expect(screen.getByRole('heading', { name: props.question })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Réponse' })).toBeInTheDocument()
    expect(screen.queryByRole('link')).toBeNull()
    expect(screen.queryByRole('application')).toBeNull()
    expect(screen.queryByRole('listItem')).toBeNull()

    await user.type(screen.getByRole('textbox', { name: 'Réponse' }), 'Charlie')
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Réponse' })).toHaveValue('Charlie')
    })

    await user.click(screen.getByRole('button', { name: 'Répondre' }))
    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('/api/answer', { answer: 'Charlie', id: props.id })
    })

    expect(await screen.findByRole('listitem', { name: 'Answer1' })).toBeInTheDocument()
    expect(screen.getByRole('listitem', { name: 'Answer2' })).toBeInTheDocument()
    expect(screen.getByRole('listitem', { name: 'Answer3' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Pour en apprendre plus, lire cet article' })).toHaveProperty(
      'href',
      'https://fr.wikipedia.org/wiki/Rickroll'
    )
    expect(screen.getByRole('application', { name: 'Answer2' })).toHaveProperty(
      'src',
      'https://www.youtube.com/embed/dQw4w9WgXcQ'
    )
  })

  test('it should display WS error', async () => {
    const user = userEvent.setup()
    mockAxios.mockRejectedValue({})
    render(<Trivia {...props} />)

    await user.type(screen.getByRole('textbox', { name: 'Réponse' }), 'Charlie')
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Réponse' })).toHaveValue('Charlie')
    })

    await user.click(screen.getByRole('button', { name: 'Répondre' }))
    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('/api/answer', { answer: 'Charlie', id: props.id })
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert').innerHTML).toMatch('Une erreur est survenue')
    })
  })

  test('it should reset state when click next', async () => {
    const user = userEvent.setup()
    mockAxios.mockResolvedValue({
      data: {
        success: true,
        answers: ['Answer1', 'Answer2', 'Answer3'],
        video: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        selection: { answer: 'Answer2' },
        wiki: 'https://fr.wikipedia.org/wiki/Rickroll',
        next: '1234',
      },
    })
    render(<Trivia {...props} />)

    await user.type(screen.getByRole('textbox', { name: 'Réponse' }), 'Charlie')
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Réponse' })).toHaveValue('Charlie')
    })

    await user.click(screen.getByRole('button', { name: 'Répondre' }))
    await waitFor(() => {
      expect(mockAxios).toHaveBeenCalledWith('/api/answer', { answer: 'Charlie', id: props.id })
      expect(screen.getByRole('application')).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Suite' }))
    await waitFor(() => {
      expect(screen.queryByRole('application')).toBeNull()
    })
  })
})
