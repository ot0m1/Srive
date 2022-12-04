import type { NextApiRequest, NextApiResponse } from 'next'
import axios, { AxiosResponse }  from 'axios'

const apiUri: string = 'https://api.spotify.com/v1'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  const result = await searchSpotify(body.token, body.name)
  res.status(result.status).json({ data: result.data.artists.items })
}

async function searchSpotify(token: string, artistName: string) {
  const response = await axios.get('https://api.spotify.com/v1/search', {
    params: {
        'query': artistName,
        'type': 'artist',
        'locale': 'ja'
    },
    headers: {
        Authorization: `Bearer ${token}`
      }
    })

  return response
}
