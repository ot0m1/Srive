import { render, screen } from '@testing-library/react'
import Layout from '../components/Layout'
import '@testing-library/jest-dom'
import type { NextPage } from 'next'
import React, { ReactNode } from 'react'

jest.mock('next-auth/react', () => {
  return {
    useSession: jest.fn(() => {
      return {status: 'authenticated'}
    })
  }
})

describe('Layout', () => {
  test('Does it receive props and display them as intended?', () => {
    render(<Layout>{<div>Test</div>}</Layout>)
    expect(screen.getByText('Test')).toBeInTheDocument()
    expect(screen.getByText('GitHub')).toBeInTheDocument()
    expect(screen.getByText('Twitter')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })
})
