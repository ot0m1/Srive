import Image from "next/legacy/image";
import { signIn } from 'next-auth/react'

const LogIn = () => {
  return (
    <>
      <div className="mt-3 mb-4">
        <h1 className="font-extrabold text-3xl">Whait is Srive</h1>
        <p className="mt-2">
          Srive is an application that solves the problem of not being able to listen to a particular artist&apos;s songs in succession on the iphone spotify application.
          <br /><br />
          With this application, you can very easily create a playlist with only songs by the particular artist.
        </p>
      </div>
      <button
        className="container cursor-pointer w-[260px] mx-auto mt-8 mb-4 py-4 px-1 border
          border-slate-100/60 bg-slate-200/10 rounded hover:bg-slate-200/20 hover:border-slate-100 hover:text-slate-50"
        onClick={() => signIn('spotify')}
      >
      <ul className="flex justify-center">
        <li className="mr-2">
          <Image
            src='/Spotify_Icon_CMYK_White.png'
            alt='spotify-logo'
            width={26}
            height={26}
          />
        </li>
        <li className="font-bold">
          Log in to Spotify
        </li>
      </ul>
      </button>
  </>
  )
}

export default LogIn
