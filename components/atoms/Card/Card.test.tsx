/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import Card from './Card'

describe('Atoms: Card', () => {
  test('it should embed my element', () => {
    render(
      <Card isMaxWidth>
        <p>Ceci est un test</p>
      </Card>
    )

    expect(screen.getByRole('article')).toBeInTheDocument()
    expect(screen.getByText('Ceci est un test')).toBeInTheDocument()
  })
})
