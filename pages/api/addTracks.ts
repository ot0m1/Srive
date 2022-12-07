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

  let status = 200

  console.log("=============================================================")
  console.log("実行回数👇")
  console.log(uris.length)

  for (const uri of uris) {
    let response = await addTracks(headers, playListId, uri)
    console.log("実行" + response.status)
    // if (response.status != 201) {
    //   status = response.status
    //   break
    // }
  }

  console.log("ループ抜けた")

  console.log("=============================================================")

  res.status(status)
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

export default Hundler
