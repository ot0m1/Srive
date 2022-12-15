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

// const mockChildComponent = jest.fn()
// jest.mock('./Layout', () => (props: any) => {
//   mockChildComponent(props)
//   // return <mock-childComponent />
//   return 'Test'
//   // return {
//   //   jest.fn(() => {
//   //     <div>Test</div>
//   //   })
//   // }
// })

describe('Layout', () => {
  test('Layout', () => {
    const dummyProps: NextPage = () => {
      return (<div>Test</div>)
    }

    // let dummyProps: ReactNode
    // beforeEach(() => {
    //   dummyProps = {
    //     body: 'dummy body 1',
    //   };
    // });
    
    // render(<Layout />)
    render(<Layout props={'Test'} />)
    // screen.getByText('Test')
    screen.getByText('GitHub')
    screen.getByText('Twitter')
    screen.getByText('Blog')
  })
})
