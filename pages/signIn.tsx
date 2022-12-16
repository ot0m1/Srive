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
        className="mt-10 container cursor-pointer w-[260px] mx-auto mb-4 py-2 px-1 border
        border-slate-100/60 bg-slate-200/10 rounded hover:bg-slate-200/20 hover:border-slate-100 hover:text-slate-50"
      >
        <Link
          href="/userPolicy"
          className=""
        >
          UserPolicy / 利用規約
        </Link>
      </p>
    </Layout>
  )
}

export default SginIn
