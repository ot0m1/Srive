import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const playListId = body.playListId
  const uris = body.uris.uris

  const headers = {
    Authorization: `Bearer ${body.token}`,
    'Content-Type': 'application/json; charset=utf-8',
  }

  let status = 200

  for (const uri of uris) {
    let response = await addTracks(headers, playListId, uri)
    if (!/^2\d{2}$/.test(response.status.toString())) {
      status = response.status
      break
    }
  }

  res.status(status).end()
}

const addTracks = async(headers: {[key: string]: string}, playListId: string, uris: string[]) => {
  const data = {
    uris: uris,
  }

  const response = await axios({
    method: 'POST',
    url: `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
    headers: headers,
    data: data
  })

  return response
}

export default Handler
