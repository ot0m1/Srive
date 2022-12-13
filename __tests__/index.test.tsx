import { render, screen } from '@testing-library/react'
import Home from '../pages/index'
import '@testing-library/jest-dom'
import { useRouter } from 'next/router'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    // const heading = screen.getByRole('heading', {
    //   name: /welcome to next\.js!/i,
    // })

    // expect(heading).toBeInTheDocument()
    screen.getByText('Srive')
  })
})
