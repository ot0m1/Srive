import { render, screen } from '@testing-library/react'
import Main from '../components/main'
import '@testing-library/jest-dom'

jest.mock('next-auth/react', () => {
  return {
    useSession: jest.fn(() => {
      return {status: 'authenticated'}
    })
  }
})

// jest.mock('next-auth/react', () => {
//   return {
//     isLoggedIn: jest.fn(() => {
//       return true
//     })
//   }
// })

describe('Home', () => {
  test('If you are not logged in, does the login screen appear?', () => {
    const isLoggedIn = jest.fn(() => true)
    // render(<Main />)
    // expect(screen.getByText('Log in to Spotify')).toBeInTheDocument()
  })
})
