import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import createRouter, { NextRouter } from 'next/router'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import '@testing-library/jest-dom'

describe('Home', () => {
  test('If you are not logged in, does the login screen appear?', () => {
    // render(<Home />)
    // expect(screen.getByText('Log in to Spotify')).toBeInTheDocument()
  })
})
