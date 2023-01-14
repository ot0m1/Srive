import type { NextPage } from 'next' 
import Image from "next/legacy/image";
import React, { useContext } from 'react'
import { TracksContext } from '../sriveContexts'

const Profile: NextPage = () => {
  const {tracks} = useContext(TracksContext)

  const hasSinglesOrAlbums = () => {
    return (tracks.singles.length > 0 || tracks.albums.length) > 0 ? true : false
  }

  const artistImage = () => {
    return (tracks.artist.images.length > 2) ? tracks.artist.images[1].url : '/no_image.png'
  }

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

export default Profile
