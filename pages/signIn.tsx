import React from 'react'
import type { NextPage } from 'next'
import Link from 'next/link'
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
      <p
        className="mt-8 container cursor-pointer mx-auto mb-4 py-2 px-1 underline hover:text-slate-50"
      >
        <Link
          href="/userPolicy"
        >
          Terms of Privacy and Use Policy / プライバシーポリシー及び利用規約
        </Link>
      </p>
    </Layout>
  )
}

export default SginIn
