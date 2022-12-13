import { render, screen } from '@testing-library/react'
import Footer from '../components/footer'
import '@testing-library/jest-dom'

describe('Footer', () => {
  test('Footer', () => {
    render(<Footer />)
    screen.getByText('GitHub')
    screen.getByText('Twitter')
    screen.getByText('Blog')
  })
})
