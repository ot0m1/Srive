import type { NextPage } from 'next'
import Image from "next/image";
import React, { useContext } from 'react'
import { TracksContext } from '../sriveContexts'

type Props = {
  artist: any
  index: number
}

const ResultArtists: NextPage<Props> = ({ artist, index }) => {
  const {tracks, getTracks} = useContext(TracksContext)

  const artistImage = () => {
    return (artist.images.length > 2) ? artist.images[2].url : '/no_image.png'
  }

  return (
    <div
      onClick={getTracks}
      id={artist.id}
      data-index={index}
      className="text-left cursor-pointer border-b mb-1 py-1 pl-1 border-slate-100/30 flex items-center rounded hover:bg-slate-200/20 hover:text-slate-50"
    >
      <div
        className="relative h-[46px] min-w-[46px] mr-[12px]"
      >
        <Image
          src={artistImage()}
          alt='artist-image'
          fill
          style={{
            objectFit: "contain"
          }} />
      </div>
      {artist.name}
    </div>
  );
}

export default ResultArtists
