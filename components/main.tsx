import type { NextPage } from 'next'
import React from 'react'
import { useSession } from 'next-auth/react'
import SearchForm from './searchForm'
import { useRouter } from 'next/router'

const Main: NextPage = () => {
  const { data: session, status } = useSession()

  const isLoggedIn = (status: string) => {
    return status === 'authenticated' ? true : false
  }

  return (
    <>
     { isLoggedIn(status) && <SearchForm /> }
    </>
  )
}

export default Main
