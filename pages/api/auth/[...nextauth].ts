import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

async function refreshAccessToken(token: any) {
  try {
    const url =
      'https://accounts.spotify.com/api/token?' +
      new URLSearchParams({
        client_id: process.env.CLIENT_ID || '',
        client_secret: process.env.CLIENT_SECRET || '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken,
      })

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    })

    const refreshedTokens = await response.json()

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.log(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
}

export const authOptions: any = {
  providers: [
    SpotifyProvider({
      clientId: process.env.CLIENT_ID || '',
      clientSecret: process.env.CLIENT_SECRET || '',
      authorization: {
        url: 'https://accounts.spotify.com/authorize',
        params: {scope: 'playlist-modify-private,playlist-read-private,playlist-read-collaborative'}
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }: {token: any, account: any}) {
      if (account) {
        token.id = account.id
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }

      return Date.now() < token.accessTokenExpires ? token : refreshAccessToken(token)
    },
    async session({ session, token }: {session: any, token: any}) {
      session.token = token

      return session
    },
  },
}

export default NextAuth(authOptions)
