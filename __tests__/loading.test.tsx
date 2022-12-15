import { render, screen } from '@testing-library/react'
import Loading from '../components/loading'
import '@testing-library/jest-dom'

describe('Loading', () => {
  test('Is the expected text displayed?', () => {
    render(<Loading />)
    screen.getByText('Creating...')
  })
})
