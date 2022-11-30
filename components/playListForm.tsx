import type { NextPage } from 'next' 
import React, { useContext, useState } from 'react'
import { TracksContext } from '../sriveContexts'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const PlaylistForm: NextPage = () => {
  const {tracks} = useContext(TracksContext)
  const session: any = useSession()
  const token = session.data.token.accessToken
  const [playListId, setPlayListId] = useState('')
  const [radioValue, setRadioValue] = useState('single')
  const [currentArtistId, settArtistId] = useState(tracks.artist.id)

  const valueList = [
    {'value': 'single', 'name': 'Singles only'},
    {'value': 'album', 'name': 'Albums only'},
    {'value': 'singleandalbum', 'name': 'Singles and Albums'},
  ]

  const createPlaylist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let playListId: string = ''

    const data = {
      token: token,
      id: session.data.user.name,
      name: playlistName(radioValue),
    }

      const JSONdata = JSON.stringify(data)
      const endpoint = '/api/playList'
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSONdata,
      }

      const playlist = await fetch(endpoint, options)
      const results = await playlist.json()
      playListId = results.data.id
      setPlayListId(playListId)
      await addTracksToPlaylist(playListId)
  }

  const playlistName = (radioValue: string) => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    let type = ''
    switch(radioValue) {
      case 'single':
        type = 'Singles'
        break
      case 'album':
        type = 'Albums'
        break
      case 'singleandalbum':
        type = 'SinglesAndAlbums'
        break
    }

    return `${tracks.artist.name} ${type} #${year}${month}${date}`
  }

  const addTracksToPlaylist = async (playListId: string) => {
    const data = {
      token: token,
      playListId: playListId,
      uris: await getEachTrack(),
    }

    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/addTracks'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const respomse = await fetch(endpoint, options)
    const results = await respomse.json()
    return results
  }

  const getEachTrack = async () => {
    const data = {
      token: token,
      ids: ids(),
    }
  
    const JSONdata = JSON.stringify(data)
    const endpoint = '/api/eachTrack'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSONdata,
    }

    const respomse = await fetch(endpoint, options)
    const results = await respomse.json()
    return results
  }

  const ids = () => {
    let ids:any[] = []

    const pushToIds = (localTracks: any[]) => {
      for (const track of localTracks) {
        ids.push(track.id)
      }
    }

    switch(radioValue) {
      case 'single':
        pushToIds(tracks.singles)
        break
      case 'album':
        pushToIds(tracks.albums)
        break
      case 'singleandalbum':
        pushToIds(tracks.singles)
        pushToIds(tracks.albums)
        break
      }

      const chunk = <T extends any[]>(array: T, size: number) => {
        return array.reduce(
          (newArray, _, i) => (i % size ? newArray : [...newArray, array.slice(i, i + size)]),
          [] as T[][]
        )
      }

    return chunk(ids, 20)
  }
  
  return (
    <div className="container mx-auto w-full md:max-w-[520px] text-center">
      <ul>
        <form onSubmit={createPlaylist}>
          {valueList.map((item, index) => (
            <li
              key={index}
              className="mb-4 w-[200px] container mx-auto rounded"
            >
              <input
                type="radio"
                name="list-type"
                value={item.value} checked={item.value === radioValue}
                onChange={event => setRadioValue(event.target.value)} 
                className="peer hidden"
                id={item.value}
                />
              <label
                htmlFor={item.value}
                className="py-[5px] inline-block w-full cursor-pointer rounded opacity-50 hover:bg-slate-200/20 border
                  peer-checked:bg-slate-200/30 peer-checked:opacity-100 peer-checked:font-semibold peer-checked:border-slate-100 peer-checked:text-slate-50"
              >
                &nbsp;&nbsp;{item.name}
              </label>
            </li>
          ))}
          <br />
          <button
            type="submit"
            className="w-[260px] py-4 border border-slate-100/60 bg-slate-200/10 rounded hover:bg-slate-200/30 hover:border-slate-100 hover:text-slate-50"
            onClick={() => settArtistId(tracks.artist.id)}
          >
            <ul className="flex justify-center">
              <li className="mr-2">
                <Image
                  className="opacity-75"
                  src='/Spotify_Icon_CMYK_White.png'
                  alt='spotify-logo'
                  width={26}
                  height={26}
                />
              </li>
              <li className="font-bold">
                Create a playlist
              </li>
            </ul>
          </button>
        </form>
      </ul>
    </div>
  )
}

export default PlaylistForm
