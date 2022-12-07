import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const Playlist = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const id = body.id
  const playlistName = body.name

  const headers = {
    Authorization: `Bearer ${body.token}`,
    'Content-Type': 'application/json; charset=utf-8',
  }

  const data = {
    name: playlistName,
    description: 'Playlist created by Srive',
    public: 'false',
  }

  const response = await axios({
    method: 'POST',
    url: `https://api.spotify.com/v1/users/${id}/playlists`,
    headers: headers,
    data: data
  })

  res.status(response.status).json({ data: response.data })
}

export default Playlist
