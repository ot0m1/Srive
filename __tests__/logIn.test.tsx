import { render, screen } from '@testing-library/react'
import LogIn from '../components/logIn'
import '@testing-library/jest-dom'

describe('LogIn', () => {
  test('LogIn', () => {
    render(<LogIn />)
    screen.getByText('Whait is Srive')
    screen.getByText('Log in to Spotify')
  })
})
