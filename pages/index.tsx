import React from 'react'
import type { NextPage } from 'next'
import Main from '../components/main'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const Home: NextPage = () => {
  const router = useRouter()
  useSession({
    required: true,
    onUnauthenticated() {
      router.push('/signIn')
    }
  })

  return (
    <Layout>
      <Main />
    </Layout>
  )
}

export default Home
