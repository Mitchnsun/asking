/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Question from './Question'

describe('components/Question', () => {
  it('should render the question with textbox', () => {
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
  })
})
