import type { NextPage } from 'next'
import React from 'react'
import Image from "next/image";
import { useSession, signOut } from 'next-auth/react'
import router from 'next/router'

const TitleArea: NextPage = () => {
  const { data: session, status } = useSession()

  const isLoggedIn = (status: string) => {
    return status === 'authenticated' ? true : false
  }

  return (
    <ul className="flex justify-center mt-4 mb-6">
      <li>
        <div
          className="cursor-pointer mt-[18px] mr-[12px]"
          onClick={() => router.push('/')}
        >
          <Image
            src='/srive_gray_e2e8f0_22do.png'
            alt='srive-logo'
            width={36}
            height={36}
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />
        </div>
      </li>
      <li >
        <div>
          <h1
            className="cursor-pointer my-2 text-center text-5xl font-black"
            onClick={() => router.push('/')}
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
                className="cursor-pointer text-xs mx-auto max-w-[100px] px-2 py-1 border border-slate-100/60
                  bg-slate-200/10 rounded hover:bg-slate-200/20 hover:border-slate-100 hover:text-slate-50"
                onClick={() => signOut({redirect: false})}
              >
                Log out
              </button>
          </div>
        </li>
      }
    </ul>
  );
}

export default TitleArea
