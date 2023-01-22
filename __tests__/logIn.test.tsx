import { render, screen } from '@testing-library/react'
import LogIn from '../components/logIn'
import '@testing-library/jest-dom'

describe('LogIn', () => {
  test('Is the expected text displayed?', () => {
    render(<LogIn />)
    expect(screen.getByText('What is Srive')).toBeInTheDocument()
    expect(screen.getByText('Log in to Spotify')).toBeInTheDocument()
  })
})
