import type { NextApiRequest, NextApiResponse } from 'next'
import { SPOTIFY_API, spotifyFetch } from '../../lib/spotify'

const Handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const playListId = body.playListId
  const uris = body.uris.uris

  let status = 200

  for (const uri of uris) {
    let response = await addTracks(body.token, playListId, uri)
    if (!/^2\d{2}$/.test(response.status.toString())) {
      status = response.status
      break
    }
  }

  res.status(status).end()
}

// Tracks are appended in order, so these have to stay serial.
const addTracks = async (token: string, playListId: string, uris: string[]) => {
  return await spotifyFetch(`${SPOTIFY_API}/playlists/${playListId}/tracks`, token, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ uris: uris }),
  })
}

export default Handler
