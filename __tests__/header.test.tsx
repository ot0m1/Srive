import { render, screen } from '@testing-library/react'
import Header from '../components/header'
import '@testing-library/jest-dom'

describe('Error', () => {
  test('Error occurred', () => {
    render(<Header />)
    screen.findByLabelText('title')
    screen.findByLabelText('meta')
  })
})
