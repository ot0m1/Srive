import { render, screen } from '@testing-library/react'
import Header from '../components/header'
import '@testing-library/jest-dom'
import { assert } from 'console'

describe('Header', () => {
  test('Is the expected tag output?', () => {
    render(<Header />)
    expect(screen.findByLabelText('title')).toContainHTML
    expect(screen.findByLabelText('meta')).toContainHTML
  })
})
