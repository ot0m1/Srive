import { render, screen } from '@testing-library/react'
import Footer from '../components/footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  test('Is the expected text displayed?', () => {
    render(<Footer />)
    screen.getByText('GitHub')
    screen.getByText('Twitter')
    screen.getByText('Blog')
  })
})
