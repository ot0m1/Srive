import type { NextPage } from 'next' 
import Image from "next/image";
import React, { useContext } from 'react'
import { TracksContext } from '../sriveContexts'

const Profile: NextPage = () => {
  const {tracks} = useContext(TracksContext)

  const artistImage = () => {
    return (tracks.artist.images.length > 2) ? tracks.artist.images[1].url : '/no_image.png'
  }

  return (
    <div className="container mx-auto my-2 w-full md:max-w-[520px]">
      <div className="flex justify-center">
        <div className="mr-3 my-3 w-[96px]">
          <a
            href={tracks.artist.external_urls.spotify}
            title="Link to artist's spotify page"
            target="_blank"
            rel="noopener noreferrer"
            className="block relative max-w-full min-w-[96px] h-[96px]"
          >
            <Image
              src={artistImage()}
              alt='artist-image'
              fill
              style={{
                objectFit: "contain"
              }} />
          </a>
        </div>
        <div className="flex items-center">
          <p className="text-left">
            <a className="font-semibold">{tracks.artist.name}</a>
            <br />
            {tracks.singles.length} Singles {tracks.albums.length} Albums {tracks.appearsOnAndCompilation.length} Others
          </p>
        </div>
      </div>
    </div>
  );
}

export default Profile
