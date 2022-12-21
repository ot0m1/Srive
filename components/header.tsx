import type { NextPage } from 'next'
import Head from 'next/head'

const Header: NextPage = () => {
  return (
    <>
      <Head>
        <title>Srive</title>
        <meta
          name="description"
          content="It is very easy to create only singles or only albums playlists for Spotify artists."
        />
        <meta property="og:url" content="https://srive.app" />
        <meta property="og:type" content="home" />
        <meta property="og:title" content="Top page of Srive" />
        <meta property="og:description" content="" />
        <meta property="og:site_name" content="Srive" />
        <meta property="og:image" content="/srive_gray_e2e8f0_22do.png" />
        <meta name="twitter:card" content="app" />
        <meta name="twitter:site" content="@ot0m1" />
        <link rel="icon" href="/srive_gray_e2e8f0_22do.png" />
      </Head>
    </>
  )
}

export default Header
