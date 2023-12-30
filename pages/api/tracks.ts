import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body

  const singles = await getTracks(body.token, body.id, 'single')
  const albums = await getTracks(body.token, body.id, 'album')
  const appearsOnAndCompilation = await getTracks(body.token, body.id, 'appears_on,compilation')

  const result = {
    'singles': singles.data,
    'albums': albums.data,
    'appearsOnAndCompilation': appearsOnAndCompilation.data,
  }

  res.status(albums.status).json({ data: result })
}

async function getTracks(token: string, id: string, groups: string = 'album,single') {
  const response = await axios.get(`https://api.spotify.com/v1/artists/${id}/albums`, {
    params: {
        'include_groups': groups,
        'limit': 50,
    },
    headers: {
        Authorization: `Bearer ${token}`
      }
    })

  return response
}
