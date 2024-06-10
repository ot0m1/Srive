import type { NextPage } from 'next' 
import React, { useContext, useState } from 'react'
import { TracksContext } from '../sriveContexts'
import Image from "next/image";
import { useSession } from 'next-auth/react'
import Profile from './profile'
import Error from './error'
import Loading from './loading'

const Playlist: NextPage = () => {
  const {tracks} = useContext(TracksContext)
  const [radioValue, setRadioValue] = useState('allsongs')
  const [currentArtistId, setArtistId] = useState(tracks.artist.id)
  const [status, setStatus] = useState(true)
  const [isLoading, setLoading] = useState(false)
  const session: any = useSession()
  const token = session.data.token.accessToken

  const hasSinglesOrAlbums = () => {
    return (tracks.singles.length > 0 || tracks.albums.length > 0 || tracks.appearsOnAndCompilation.length > 0) ? true : false
  }

  const createPlaylist = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    let createdPlayListId: string = ''

    const data = {
      token: token,
      id: session.data.token.sub , 
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

    if (playlist.status != 201) {
      setStatus(false)
      return
    }

    const results = await playlist.json()
    createdPlayListId = await results.data.id
    tracks.playlistId = createdPlayListId
    await addTracksToPlaylist(createdPlayListId)

    setLoading(false)
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

    const response = await fetch(endpoint, options)

    if (response.status != 200) {
      setStatus(false)
    }
  }

  const getEachTrack = async () => {
    const data = {
      token: token,
      ids: ids(),
      artistId: currentArtistId,
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

    const response = await fetch(endpoint, options)

    if (response.status != 200) {
      setStatus(false)
      return
    }

    const results = await response.json()
    setLoading(false)
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
      case 'allsongs':
        pushToIds(tracks.singles)
        pushToIds(tracks.albums)
        pushToIds(tracks.appearsOnAndCompilation)
        break
      case 'single':
        pushToIds(tracks.singles)
        break
      case 'album':
        pushToIds(tracks.albums)
        break
      case 'others':
        pushToIds(tracks.appearsOnAndCompilation)
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

  const playlistName = (radioValue: string) => {
    const today = new Date()
    const year = today.getFullYear()
    const month = today.getMonth() + 1
    const date = today.getDate()
    let type = ''
    switch(radioValue) {
      case 'allsongs':
        type = 'All Songs'
        break
      case 'single':
        type = 'Singles'
        break
      case 'album':
        type = 'Albums'
        break
      case 'others':
        type = 'Others'
        break
    }

    return `${tracks.artist.name} ${type} #${year}${month}${date}`
  }

  const getPlayListUrl = () => {
    return (tracks.playlistId != '') ? `https://open.spotify.com/playlist/${tracks.playlistId}` : ''
  }

  const PlayListForm = () => {
    const valueList = [
      {'value': 'allsongs', 'name': 'All Songs'},
      {'value': 'single', 'name': 'Singles only'},
      {'value': 'album', 'name': 'Albums only'},
      {'value': 'others', 'name': 'Others'},
    ]
    
    return (
      <div
        className="container mx-auto w-full md:max-w-[520px] text-center"
      >
        <div>
          <form onSubmit={createPlaylist}>
            {valueList.map((item, index) => (
              <div
                key={index}
                className="mb-3 w-[200px] container mx-auto rounded"
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
                  className="mb-1 py-[5px] inline-block w-full cursor-pointer rounded opacity-50 hover:bg-slate-200/20 border
                    peer-checked:bg-slate-200/30 peer-checked:opacity-100 peer-checked:font-semibold peer-checked:border-slate-100 peer-checked:text-slate-50"
                >
                  {item.name}
                </label>
              </div>
            ))}
            <button
              type="submit"
              className="w-[260px] mt-3 py-4 border border-slate-100/60 bg-slate-200/10 rounded hover:bg-slate-200/30 hover:border-slate-100 hover:text-slate-50"
              onClick={() => setArtistId(tracks.artist.id)}
              onMouseEnter={() => setArtistId(tracks.artist.id)}
              onTouchStart={() => setArtistId(tracks.artist.id)}
            >
              <div className="flex justify-center">
                <div className="mr-2">
                  <Image
                    className="opacity-75"
                    src='/Spotify_Icon_CMYK_White.png'
                    alt='spotify-logo'
                    width={26}
                    height={26}
                    style={{
                      maxWidth: "100%",
                      height: "auto"
                    }} />
                </div>
                <span className="font-bold">
                  Create a playlist
                </span>
              </div>
            </button>
          </form>
        </div>
      </div>
    );
  }

  if (!status) {
    return (<Error />)
  }

  return <>
    <Profile />
    <p className="text-center mx-auto mt-4 mb-3">
      {hasSinglesOrAlbums() ?
        <span>Create playlist with the artist you searched for</span>
        :
        <span>No songs found. It is possible that it could be a public playlist.</span>
      }
    </p>
    { (tracks.singles.length === 50 || tracks.albums.length === 50 || tracks.appearsOnAndCompilation.length === 50) ?
      <p className="text-sm mt-1 mb-4 max-w-90% mx-auto text-center">
        Due to API specifications, up to 50 copies of each can be added to the playlist.
      </p>
      :
      <></>
    }
    { hasSinglesOrAlbums() && <PlayListForm /> }
    { isLoading && <Loading />}
    { !isLoading && getPlayListUrl() != '' && currentArtistId === tracks.artist.id &&
      <p>
          <a
            href={ getPlayListUrl() }
            target="_blank"
            rel="noopener noreferrer"
          >
          <button
            type="button"
            className="w-[260px] py-4 mt-5 px-1 border border-slate-100/60 bg-slate-200/10 rounded
              hover:bg-slate-200/30 hover:border-slate-100 hover:text-slate-50"
              onClick={() => tracks.playlistId = ''}
          >
            <ul className="flex justify-center">
              <li className="mr-2">
                <Image
                  src='/Spotify_Icon_CMYK_Green.png'
                  alt='spotify-logo'
                  width={26}
                  height={26}
                  style={{
                    maxWidth: "100%",
                    height: "auto"
                  }} />
              </li>
              <li className="font-bold">
                Open a playlist in Spotify
              </li>
            </ul>
          </button>
        </a>
      </p>
    }
  </>;
}

export default Playlist
