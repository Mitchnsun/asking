/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import IndexPage from '.'

describe('page/index', () => {
  it('should render Index Page', () => {
    render(<IndexPage />)
    expect(screen.getByRole('heading').textContent).toBe('Question ?')
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Répondre' })).toBeInTheDocument()
  })
})
