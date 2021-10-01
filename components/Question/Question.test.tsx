/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import IndexPage from '.'

describe('components/Question', () => {
  it('should render the question with textbox', () => {
    render(<IndexPage />)
    expect(screen.getByRole('heading').textContent).toBe('Quel est le premier président de la Vième République ?')
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Répondre' })).toBeInTheDocument()
  })
})
