import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const Hundler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const playListId = body.playListId
  const uris = body.uris.uris

  const headers = {
    Authorization: `Bearer ${body.token}`,
    'Content-Type': 'application/json; charset=utf-8',
  }

  for (const uri of uris) {
    await addTracks(headers, playListId, uri)
  }

  res.status(200)
}

const addTracks = async(headers: {[key: string]: string}, playListId: string, uris: string[]) => {
  const data = {
    uris: uris,
  }

  await axios({
    method: 'POST',
    url: `https://api.spotify.com/v1/playlists/${playListId}/tracks`,
    headers: headers,
    data: data
  })
}

export default Hundler
