/**
 * @jest-environment jsdom
 */
import { render, screen } from '@testing-library/react'
import IndexPage from '.'

describe('Index page', () => {
  it('should render Index Page', () => {
    render(<IndexPage />)
    expect(screen.getByRole('heading', { name: 'Welcome to Next.js!' })).toBeInTheDocument()
  })
})
