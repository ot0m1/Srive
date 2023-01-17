import Header from '../components/header'
import Footer from '../components/footer'
import TitleArea from '../components/titleArea'
import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className="container mx-auto md:w-[60%] flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <section className="container mx-auto px-4 text-center">
          <TitleArea />
          { children }
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
