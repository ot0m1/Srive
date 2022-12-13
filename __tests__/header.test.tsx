import { render, screen } from '@testing-library/react'
import Header from '../components/header'
import '@testing-library/jest-dom'

describe('Header', () => {
  test('Header', () => {
    render(<Header />)
    screen.findByLabelText('title')
    screen.findByLabelText('meta')
  })
})
