import type { NextApiRequest, NextApiResponse } from 'next'

const Playlist = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const id = body.id
  const playlistName = body.name

  const response = await fetch(`https://api.spotify.com/v1/users/${id}/playlists`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${body.token}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify({
      name: playlistName,
      description: 'Playlist created by Srive',
      public: false,
    }),
  })

  const data = await response.json()
  res.status(response.status).json({ data: data })
}

export default Playlist
