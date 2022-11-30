import type { NextPage } from 'next'
import Header from '../components/header'
import Main from '../components/main'
import Footer from '../components/footer'
import React from 'react'

const Home: NextPage = () => {
  return (
    <div className="container mx-auto md:w-[60%] flex flex-col min-h-screen">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

export default Home
