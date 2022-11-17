import type { NextPage } from 'next'
import ResultArtists from './resultArtists'
import Playlist from './playList'
import React, { useState, useContext } from 'react'
import { SearchingContext, TracksContext } from '../sriveContexts'
import { useSession } from 'next-auth/react'

type Props = {
  artists: any
}

const Results: NextPage<Props> = ({ artists }) => {
  const [tracks, setTracks] = useState({
    'singles': [],
    'albums': [],
    'artist': [],
  })

  const session = useSession()
  const token = session.data.token.accessToken
  const {searching, setSearching} = useContext(SearchingContext)

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
    const results = await response.json()

    setTracks({
      'singles': results.data.singles.items,
      'albums': results.data.albums.items,
      'artist': artists[index]
    })
  }

  return (
    <TracksContext.Provider value={{tracks, getTracks}}>
      <div className="container mx-auto max-h-[140px] w-full max-w-[600px] md:max-h-[200px] sm:max-w-[520px] mb-3 px-2 py-1 border border-slate-100/60 bg-slate-200/10 rounded overflow-scroll">
        <ul className="list-none">
          {artists.map((artist: any, index: number) => {
            return (
              <li key={index}>
                <ResultArtists artist={artist} index={index}/>
              </li>
            )
          })}
        </ul>
      </div>
      {tracks && <Playlist />}
    </TracksContext.Provider>
  )
}

export default Results
