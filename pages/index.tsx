import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import SearchForm from '../components/searchForm'
import React from 'react'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import LogIn from '../components/logIn'
import router, { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { data: session, status } = useSession()

  const isLoggedIn = (status: string) => {
    return status === 'authenticated' ? true : false
  }

  return (
    <div className="container mx-auto md:w-[60%] flex flex-col min-h-screen">
      <Head>
        <title>Srive</title>
        <meta name="description" content="It is very easy to create only singles or only albums playlists for Spotify artists." />
        <link rel="icon" href="/srive_gray_e2e8f0_22do.png" />
      </Head>

      <main className="flex-grow">
        <section className="container mx-auto w-[90%] text-center">
          {/* <Link href="/"> */}
          {/* <Link href="/" onClick={() => router.reload()}> */}
            <ul className="flex justify-center mb-6">
              <li>
                <div
                  className="cursor-pointer mt-[18px] mr-[12px]"
                  onClick={() => router.reload()}
                >
                    <Image
                      src='/srive_gray_e2e8f0_22do.png'
                      alt='srive-logo'
                      width={36}
                      height={36}
                    />
                </div>
              </li>
              <li >
                <div>
                  <h1
                    className="cursor-pointer my-2 text-center text-base font-black text-5xl"
                    onClick={() => router.reload()}
                  >
                    Srive
                  </h1>
                </div>
              </li>
              { isLoggedIn(status) &&
                <li>
                  <div
                    className="relative top-6 -right-4">
                      <button
                        className="cursor-pointer text-xs mx-auto max-w-[100px] mt-1 mb-4 px-1 border border-slate-100/60 bg-slate-200/10 rounded hover:bg-slate-200/20"
                        onClick={() => signOut({redirect: false})}
                      >
                        Sign out
                      </button>
                  </div>
                </li>
              }
            </ul>
          {/* </Link> */}
          { isLoggedIn(status) ? <SearchForm /> : <LogIn /> }
        </section>
      </main>

      <footer className="mx-auto footer text-center text-xs">
        {/* <div className="mb-1 flex justify-center">
          <Image src='/srive_gray_e2e8f0_22do.png' alt='srive-logo' width={26} height={26}/>
        </div> */}
        <ul className="flex mb-3 text-slate-200/80 font-medium">
          <li className="mx-1">GitHub</li>
          <li className="mx-1">Twitter</li>
          <li className="mx-1">Blog</li>
        </ul>
        {/* <div className="mb-2 flex justify-center">
          ot0m1
        </div> */}
      </footer>
    </div>
  )
}

export default Home
