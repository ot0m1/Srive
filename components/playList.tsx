import type { NextPage } from 'next' 
import React, { useContext, useState } from 'react'
import { TracksContext } from '../sriveContexts'
import Image from 'next/image'
import { useSession } from 'next-auth/react'

const Playlist: NextPage = () => {
  const {tracks} = useContext(TracksContext)
  const [radioValue, setRadioValue] = useState('single')
  const [playListId, setPlayListId] = useState('')
  const [currentArtistName, settArtistName] = useState(tracks.artist.name)
  const session: any = useSession()
  const token = session.data.token.accessToken

  const hasSinglesOrAlbums = () => {
    return (tracks.singles.length > 0 || tracks.albums.length) > 0 ? true : false
  }

  const artistImage = () => {
    return (tracks.artist.images.length > 2) ? tracks.artist.images[1].url : '/no_image.png'
  }

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

  const playListUrl = () => {
    return (playListId != '') ? `https://open.spotify.com/playlist/${playListId}` : ''
  }

  const PlaylistForm = () => {
    const valueList = [
      {'value': 'single', 'name': 'Singles only'},
      {'value': 'album', 'name': 'Albums only'},
      {'value': 'singleandalbum', 'name': 'Singles and Albums'},
    ]
    
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
              onClick={() => settArtistName(tracks.artist.name)}
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

  const Profile = () => {
    return (
      <div className="container mx-auto my-2 w-full md:max-w-[520px]">
        <div className="flex justify-center mt-1">
          <div className="mr-3 my-3 w-[96px]">
            <a
              href={tracks.artist.external_urls.spotify}
              title="Link to artist's spotify page"
              target="_blank"
              rel="noopener noreferrer"
              className="block relative max-w-full h-[96px]"
            >
              <Image
                src={artistImage()}
                alt='artist-image'
                layout="fill"
                objectFit="contain"
                sizes="(max-height: 96px),
                (max-width: 96px)"
              />
            </a>
          </div>
          <div className="flex items-center">
            <p className="text-left">
              <a className="font-semibold">{tracks.artist.name}</a>
              <br />
              {tracks.singles.length} Singles {tracks.albums.length} Albums
            </p>
          </div>
        </div>
        <p
          className="text-center mx-auto max-w-[500px]">
          {hasSinglesOrAlbums() ?
            <span>Create playlist with the artist you searched for</span>
            :
            <span>No songs found. It is possible that the artist participated only in the compilation album or it could be a public playlist.</span>            
          }
        </p>
      </div>
    )
  }

  return (
    <>
      <Profile />
      { tracks.singles.length === 50 || tracks.albums.length === 50 ?
        <p className="text-sm mt-1 mb-4 max-w-90% mx-auto text-center">
          Due to API specifications, a maximum of 50 singles and 50 albums each can be added to the playlist.
        </p>
        :
        <></>
      }
      { hasSinglesOrAlbums() && <PlaylistForm /> }
      { playListUrl() != '' &&  (currentArtistName === tracks.artist.name) &&
        <p>
            <a
              href={ playListUrl() }
              target="_blank"
              rel="noopener noreferrer"
            >
            <button
              type="button"
              className="w-[260px] py-4 mt-5 mb-8 px-1 border border-slate-100/60 bg-slate-200/10 rounded
                hover:bg-slate-200/30 hover:border-slate-100 hover:text-slate-50"
            >
              <ul className="flex justify-center">
                <li className="mr-2">
                  <Image
                    src='/Spotify_Icon_CMYK_Green.png'
                    alt='spotify-logo'
                    width={26}
                    height={26}
                  />
                </li>
                <li className="font-bold">
                  Open a playlist in Spotify
                </li>
              </ul>
            </button>
          </a>
        </p>
      }
    </>
  )
}

export default Playlist
