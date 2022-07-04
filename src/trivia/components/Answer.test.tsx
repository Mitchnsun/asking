/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Answer from './Answer'

describe('Trivia/components: Answer', () => {
  test('it should display the answers and the details', () => {
    render(
      <Answer
        answers={['Answer1', 'Answer2', 'Answer3']}
        video="https://www.youtube.com/embed/dQw4w9WgXcQ"
        selection={{ answer: 'Answer2' }}
        wiki="https://fr.wikipedia.org/wiki/Rickroll"
      />
    )

    expect(screen.getByRole('heading', { name: 'Réponse(s) acceptée(s)' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: "Plus d'informations" })).toBeInTheDocument()
    expect(screen.getByRole('listitem', { name: 'Answer1' })).toBeInTheDocument()
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

  test('it should not have an iframe without video', () => {
    render(
      <Answer
        answers={['Answer1', 'Answer2', 'Answer3']}
        selection={{ answer: 'Answer2' }}
        wiki="https://fr.wikipedia.org/wiki/Rickroll"
      />
    )

    expect(screen.queryByRole('application')).toBeNull()
  })

  test('it should not render answer if empty', () => {
    render(<Answer selection={{ answer: 'Answer2' }} wiki="https://fr.wikipedia.org/wiki/Rickroll" />)
    expect(screen.queryByRole('listitem')).toBeNull()
  })
})
