import { render, screen, fireEvent } from '@testing-library/react'
import TitleArea from '../components/titleArea'
import '@testing-library/jest-dom'

// https://github.com/nextauthjs/next-auth/discussions/4185
jest.mock('next-auth/react', () => {
  return {
    useSession: jest.fn(() => {
      return {status: 'authenticated'}
    })
  }
})

describe('TitleArea', () => {
  test('Is the logout button displayed if the login is successful?', () => {
    render(<TitleArea />)
    expect(screen.getByText('Log out')).toBeInTheDocument()
  })

  test('Is the application name displayed?', () => {
    render(<TitleArea />)
    expect(screen.getByText('Srive')).toBeInTheDocument()
  })
})
