import { render, screen } from '@testing-library/react'
import TitleArea from '../components/titleArea'
import '@testing-library/jest-dom'

// https://github.com/nextauthjs/next-auth/discussions/4185
jest.mock('next-auth/react', () => {
  const originalModule = jest.requireActual('next-auth/react')
  return {
    ...originalModule,
    useSession: jest.fn(() => {
      return {status: 'authenticated'}
    }),
  }
})

describe('TitleArea', () => {
  test('Is the application name displayed?', () => {
    render(<TitleArea />)
    screen.getByText('Srive')
  })

  test('Is the logout button displayed if the login is successful?', () => {
    render(<TitleArea />)
    screen.getByText('Log out')
  })
})
