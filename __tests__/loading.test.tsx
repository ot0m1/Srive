import { render, screen } from '@testing-library/react'
import Loading from '../components/loading'
import '@testing-library/jest-dom'

describe('Footer', () => {
  test('Loading', () => {
    render(<Loading />)
    screen.getByText('Creating...')
  })
})
