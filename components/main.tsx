import type { NextPage } from 'next'
import React from 'react'
import { useSession } from 'next-auth/react'
import SearchForm from './searchForm'

const Main: NextPage = () => {
  const session: any = useSession()

  const isLoggedIn = (status: string) => {
    return status === 'authenticated' ? true : false
  }

  return (
    <>
      { isLoggedIn(session.status) && <SearchForm /> }
    </>
  )
}

export default Main
