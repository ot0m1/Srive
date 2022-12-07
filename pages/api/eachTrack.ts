import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

const EachTrack = async (req: NextApiRequest, res: NextApiResponse) => {
  const body = req.body
  const token = body.token
  const ids = body.ids

  const [status, uris] = await getTrackId(token, ids)

  res.status(status).json({ uris: uris })
}

const getTrackId = async (token: any, ids: any) => {
  let albums: any = []
  let tracks: any = []
  let uris: any = []
  let status: number = 200

  for (const id of ids) {
    const severalId = id.join(',')
    const response = await axios.get(`https://api.spotify.com/v1/albums`, {
      params: {
          'ids': severalId,
      },
      headers: {
          Authorization: `Bearer ${token}`
        }
      })

    albums = albums.concat(response.data.albums)
    if (response.status != 200) {
      status = response.status
      break
    }
  }

  for (const album of albums) {
    tracks = tracks.concat(album.tracks.items)
  }

  for (const track of tracks) {
    uris = uris.concat(track.uri)
  }

  uris = chunk(uris, 100)

  return [status, uris]
}

function chunk<T extends any[]>(array: T, size: number) {
  return array.reduce(
      (newArray, _, i) => (i % size ? newArray : [...newArray, array.slice(i, i + size)]),
      [] as T[][]
  )
}

export default EachTrack
