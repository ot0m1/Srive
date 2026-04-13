import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  const result = await searchSpotify(body.token, body.name)
  res.status(result.status).json({ data: result.data.artists.items })
}

async function searchSpotify(token: string, artistName: string) {
  const params = new URLSearchParams({
    'query': artistName,
    'type': 'artist',
    'locale': 'ja'
  })

  const response = await fetch(`https://api.spotify.com/v1/search?${params}`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return { status: response.status, data: await response.json() }
}
