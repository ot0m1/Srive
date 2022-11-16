import { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    expires: date
    token: {
      [accessToken: string]: string
      [exp: string]: number
      [iat: string]: number
      [jti: string]: string
      [naem: string]: string
      [refreshToken: string]: string
      [sub: string]: string
    }
    user: {
      [neme: string]: string
    }
    error: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    bar: number
  }
}
