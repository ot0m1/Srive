import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const apiUri: string = 'https://api.spotify.com/v1'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  const result = await getCurrentUsersProfile(body.token)
  res.status(result.status).json({ data: result.data })
}

async function getCurrentUsersProfile(token: string) {
  const response = await axios.get('https://api.spotify.com/v1/me', {
    headers: {
        Authorization: `Bearer ${token}`
      }
    })

  return response
}
