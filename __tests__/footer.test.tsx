import { render, screen } from '@testing-library/react'
import Footer from '../components/footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  test('Is the expected text displayed?', () => {
    render(<Footer />)
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })
})
