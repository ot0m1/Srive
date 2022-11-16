import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body

  if (!body.id) {
    return res.status(400).json({ data: 'Id not found' })
  }

  const singles = await getTracks(body.token, body.id, 'single')
  const albums = await getTracks(body.token, body.id, 'album')

  const result = {
    'singles': singles, 
    'albums': albums,
  }

  res.status(200).json({ data: result })
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
  return response.data
}
