import type { NextPage } from 'next'
import Header from '../components/header'
import Main from '../components/main'
import Footer from '../components/footer'
import React from 'react'
import { useSession, signOut } from 'next-auth/react'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  const isLoggedIn = (status: string) => {
    return status === 'authenticated' ? true : false
  }

  return (
    <div className="container mx-auto md:w-[60%] flex flex-col min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Home
