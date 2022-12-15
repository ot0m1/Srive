import { render, screen } from '@testing-library/react'
import Error from '../components/error'
import '@testing-library/jest-dom'

describe('Error', () => {
  test('Is the expected text displayed?', () => {
    render(<Error />)
    screen.getByText('Error occurred')
  })
})
