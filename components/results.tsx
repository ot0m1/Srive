import type { NextPage } from 'next'
import ResultArtists from './resultArtists'
import Playlist from './playList'
import Error from './error'
import React, { useState } from 'react'
import { TracksContext } from '../sriveContexts'
import { useSession } from 'next-auth/react'

type Props = {
  artists: any
}

const Results: NextPage<Props> = ({ artists }) => {
  const [tracks, setTracks] = useState({
    'singles': [],
    'albums': [],
    'appearsOnAndCompilation': [],
    'artist': [],
    'playlistId': ''
  })

  const session: any = useSession()
  const token = session.data.token.accessToken
  const [status, setStatus] = useState(true)

  const getTracks = async (event: React.MouseEvent<HTMLInputElement>) => {
    const data = {
      token: token,
      id: (event.currentTarget as HTMLInputElement).getAttribute('id'),
    }

    const index = (event.currentTarget as HTMLInputElement).getAttribute('data-index') || ''

    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/tracks'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }
  
    const response = await fetch(endpoint, options)

    if (response.status === 200) {
      const results = await response.json()
      setTracks({
        'singles': results.data.singles.items,
        'albums': results.data.albums.items,
        'appearsOnAndCompilation': results.data.appearsOnAndCompilation.items,
        'artist': artists[index],
        'playlistId': ''
      })
    } else {
      setStatus(false)
    }
  }

  const hasSpotifyInformations = (tracks: any) => {
    return tracks.artist.name ? true : false
  }

  return (
    <>
      { status &&
        <TracksContext.Provider value={{tracks, getTracks}}>
            <div className="container mx-auto max-h-[140px] w-full max-w-[600px] md:max-h-[200px]
              sm:max-w-[520px] mb-3 px-2 py-1 border border-slate-100/60 bg-slate-200/10 rounded overflow-y-auto">
              <ul className="list-none">
                {artists.map((artist: any, index: number) => {
                  return (
                    <li
                      key={index}
                      className="border-b border-slate-100/30"
                    >
                      <ResultArtists artist={artist} index={index}/>
                    </li>
                  )
                })}
              </ul>
            </div>
          {status && hasSpotifyInformations(tracks) && <Playlist />}
        </TracksContext.Provider>
      }
      { !status && <Error />}
    </>
  )
}

export default Results
