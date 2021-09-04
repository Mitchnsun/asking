/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import IndexPage from '.'

describe('components/Question', () => {
  it('should render the question with textbox', () => {
    render(<IndexPage />)
    expect(screen.getByRole('heading').textContent).toBe('Question ?')
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Répondre' })).toBeInTheDocument()
  })
})
