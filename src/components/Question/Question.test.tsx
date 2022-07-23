/**
 * @jest-environment jsdom
 */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Question from './Question'

jest.mock('next/link', () => {
  return ({ children }: { children: JSX.Element }): JSX.Element => {
    return children
  }
})

describe('components/Question', () => {
  test('it should render the question with textbox', () => {
    render(
      <Question
        question="Quel est le premier président de la Vième République ?"
        category="HIS"
        nextURI={null}
        reset={() => jest.fn()}
        onSubmit={() => jest.fn()}
      />
    )
    expect(screen.getByRole('heading').textContent).toBe('Quel est le premier président de la Vième République ?')
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Répondre' })).toBeInTheDocument()
    expect(screen.queryByRole('alert')).toBeNull()
    expect(screen.queryByRole('button', { name: 'Suite' })).toBeNull()
  })

  test('it should submit answer', async () => {
    const user = userEvent.setup()
    const props = {
      question: 'Quel est le premier président de la Vième République ?',
      category: 'HIS',
      nextURI: null,
      reset: jest.fn(),
      onSubmit: jest.fn(),
    }
    render(<Question {...props} />)
    await waitFor(() => {
      expect(screen.getByText(props.question)).toBeInTheDocument()
    })

    await user.click(screen.getByRole('button', { name: 'Répondre' }))
    await waitFor(() => {
      expect(props.onSubmit).not.toHaveBeenCalled()
      expect(screen.getByText('Indiquer votre réponse')).toBeInTheDocument()
    })

    await user.type(screen.getByRole('textbox', { name: 'Réponse' }), 'Charlie')
    await waitFor(() => {
      expect(screen.queryByText('Indiquer votre réponse')).toBeNull()
      expect(screen.getByRole('textbox', { name: 'Réponse' })).toHaveValue('Charlie')
    })

    await user.click(screen.getByRole('button', { name: 'Répondre' }))
    await waitFor(() => {
      expect(props.onSubmit).toHaveBeenCalledWith({ answer: 'Charlie' }, expect.anything())
    })
  })

  test('it should display link to next question', async () => {
    const user = userEvent.setup()
    const props = {
      question: 'Quel est le premier président de la Vième République ?',
      category: 'HIS',
      nextURI: null,
      reset: jest.fn(),
      onSubmit: jest.fn(),
    }
    const { rerender } = render(<Question {...props} />)
    await user.type(screen.getByRole('textbox', { name: 'Réponse' }), 'Charlie')
    await waitFor(() => {
      expect(screen.getByRole('textbox', { name: 'Réponse' })).toHaveValue('Charlie')
    })

    await user.click(screen.getByRole('button', { name: 'Répondre' }))
    await waitFor(() => {
      expect(props.onSubmit).toHaveBeenCalledWith({ answer: 'Charlie' }, expect.anything())
    })

    rerender(<Question {...props} nextURI="/trivia/1234" />)
    expect(screen.queryByRole('button', { name: 'Répondre' })).toBeNull()

    await user.click(screen.getByRole('button', { name: 'Suite' }))
    await waitFor(() => {
      expect(props.reset).toHaveBeenCalled()
    })
  })

  describe('Status Question', () => {
    test('it shoud display success information', () => {
      const props = {
        question: 'Quel est le premier président de la Vième République ?',
        category: 'HIS',
        status: 'success',
        nextURI: '/trivia/1234',
        reset: jest.fn(),
        onSubmit: jest.fn(),
      }
      render(<Question {...props} />)

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert').innerHTML).toMatch('Bravo !')
    })

    test('it shoud display a disclaimer when status wrong', () => {
      const props = {
        question: 'Quel est le premier président de la Vième République ?',
        category: 'HIS',
        status: 'wrong',
        nextURI: '/trivia/1234',
        reset: jest.fn(),
        onSubmit: jest.fn(),
      }
      render(<Question {...props} />)

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert').innerHTML).toMatch('Mauvaise réponse')
    })

    test('it shoud display error information', () => {
      const props = {
        question: 'Quel est le premier président de la Vième République ?',
        category: 'HIS',
        status: 'error',
        nextURI: '/trivia/1234',
        reset: jest.fn(),
        onSubmit: jest.fn(),
      }
      render(<Question {...props} />)

      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(screen.getByRole('alert').innerHTML).toMatch('Une erreur est survenue')
    })

    test('it shoud disable button when loading', () => {
      const props = {
        question: 'Quel est le premier président de la Vième République ?',
        category: 'HIS',
        status: 'loading',
        nextURI: null,
        reset: jest.fn(),
        onSubmit: jest.fn(),
      }
      render(<Question {...props} />)

      expect(screen.queryByRole('alert')).toBeNull()
      expect(screen.getByRole('progressbar')).toBeInTheDocument()
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })
})
