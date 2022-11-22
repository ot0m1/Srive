import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider, signIn, useSession } from 'next-auth/react'
import { useEffect } from 'react'

function Init() {
  const { data: session } = useSession()

  if (session && (Date.now() >= parseInt(session!.token.accessTokenExpires))) {
    signIn('spotify')
  }

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn('spotify')
    }
  }, [session])

  return null
}

function App({
  Component,
  pageProps: { session, ...pageProps } }: AppProps,
  ) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
      <Init />
    </SessionProvider>
  )
}

export default App
