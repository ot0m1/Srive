import React from 'react'
import type { NextPage } from 'next'
import Login from '../components/logIn'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

const SginIn: NextPage = () => {
  const router = useRouter()
  const { data: session, status } = useSession()

  if (status === 'authenticated') router.push('/')

  return (
    <Layout>
      <Login />
    </Layout>
  )
}

export default SginIn
