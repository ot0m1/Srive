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
        className="container cursor-pointer max-w-[140px] mx-auto mt-1 mb-4 border border-slate-100/60 bg-slate-200/10 rounded hover:bg-slate-200/20 hover:border-slate-100"
        onClick={() => signIn('spotify')}
      >
        Log in to Spotify
      </button>
  </>
  )
}

export default LogIn
